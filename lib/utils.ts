import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSiteUrl() {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  
  if (process.env.NODE_ENV === "production") {
    if (!envUrl || envUrl.includes("localhost")) {
      if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
        return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
      }
      if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
      }
      return "https://ieee-orm.ipb.ac.id";
    }
  }
  
  return envUrl || "http://localhost:3000";
}
