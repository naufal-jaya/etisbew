import { type SchemaTypeDefinition } from 'sanity';

import blockContent from './schemas/blockContent';
import post from './schemas/post';
import author from './schemas/author';
import category from './schemas/category';
import service from './schemas/service';
import teamMember from './schemas/teamMember';
import about from './schemas/about';
import siteSettings from './schemas/siteSettings';
import aboutPage from './schemas/aboutPage';
import division from './schemas/division';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    author,
    category,
    blockContent,
    service,
    teamMember,
    about,
    siteSettings,
    aboutPage,
    division,
  ],
};
