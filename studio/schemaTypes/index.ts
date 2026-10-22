import { partnerSchema } from './partner';
import { milestoneSchema } from './milestone';
import { divisionSchema } from './division';
import { categorySchema } from './category';
import { newsSchema } from './news';
import { featuredPostSchema } from './featuredPost';

export const schemaTypes = [
  featuredPostSchema,
  newsSchema,
  categorySchema,
  divisionSchema,
  milestoneSchema,
  partnerSchema,
];
export {
  partnerSchema,
  milestoneSchema,
  divisionSchema,
  categorySchema,
  newsSchema,
  featuredPostSchema,
};
