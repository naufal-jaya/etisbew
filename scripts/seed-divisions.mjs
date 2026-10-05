/**
 * Bulk Seed Script for Sanity - Division & Members
 * 
 * Usage:
 *   node scripts/seed-divisions.mjs
 * 
 * Requirements in .env.local:
 *   PUBLIC_SANITY_PROJECT_ID=...
 *   PUBLIC_SANITY_DATASET=production
 *   SANITY_API_WRITE_TOKEN=... (Token with Write or Editor permissions from sanity.io/manage)
 */

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'v2';
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN;

if (!projectId || !token) {
  console.error('❌ Missing PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function uploadImage(imageSource) {
  if (!imageSource) return null;

  try {
    let stream;
    let filename = 'image.jpg';

    if (imageSource.startsWith('http://') || imageSource.startsWith('https://')) {
      const response = await fetch(imageSource);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const buffer = await response.arrayBuffer();
      stream = Buffer.from(buffer);
      filename = path.basename(new URL(imageSource).pathname) || 'remote-image.jpg';
    } else {
      const cleanPath = imageSource.replace(/^\//, '');
      const filePath = path.resolve('public', cleanPath);
      if (!fs.existsSync(filePath)) {
        console.warn(`  ⚠️ Local file not found: ${filePath}`);
        return null;
      }
      stream = fs.createReadStream(filePath);
      filename = path.basename(filePath);
    }

    const asset = await client.assets.upload('image', stream, { filename });
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (err) {
    console.warn(`  ⚠️ Failed to upload image "${imageSource}":`, err.message);
    return null;
  }
}

/**
 * Expected schema:
 * - name: string
 * - description: string
 * - groupPhoto: string (file path in public/ or URL)
 * - members: Array of { name, photo, linkedin?: string }
 */
export async function runBulkSeed(divisionsData) {
  console.log(`\n🚀 Starting bulk seed for ${divisionsData.length} divisions into Sanity...\n`);

  for (const div of divisionsData) {
    console.log(`📂 Processing Division: ${div.name}...`);

    const groupPhotoAsset = await uploadImage(div.groupPhoto);

    const membersPayload = [];
    for (const member of div.members || []) {
      console.log(`   👤 Uploading member: ${member.name}`);
      const memberPhotoAsset = await uploadImage(member.photo || member.image);

      const memberObj = {
        _key: crypto.randomUUID(),
        name: member.name,
        photo: memberPhotoAsset,
      };

      // LinkedIn username is optional
      if (member.linkedin && member.linkedin.trim() !== '') {
        // Strip full URL if provided, keeping just username
        const cleanUsername = member.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//i, '').replace(/\/$/, '');
        memberObj.linkedin = cleanUsername;
      }

      membersPayload.push(memberObj);
    }

    const doc = {
      _type: 'division',
      name: div.name,
      description: div.description || '',
      groupPhoto: groupPhotoAsset,
      members: membersPayload,
    };

    // Use deterministic ID based on division name
    const docId = `division-${div.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    doc._id = docId;

    await client.createOrReplace(doc);
    console.log(`   ✅ Division "${div.name}" saved with ${membersPayload.length} members!\n`);
  }

  console.log('🎉 Bulk seeding complete!');
}

if (process.argv[1]?.endsWith('seed-divisions.mjs')) {
  console.log('Script is ready. Call runBulkSeed(yourDivisionsArray) to execute.');
}
