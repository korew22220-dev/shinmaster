import { company } from '../config/company';
import { products, type Product } from './products';
import { branches } from './branches';
import { promotions } from './promotions';
import { services, fittingPrices } from './services';

export type SiteData = {
  products: Product[];
  company: typeof company;
  branches: typeof branches;
  promotions: typeof promotions;
  services: string[];
  fittingPrices: Record<string, number>;
};
export type ContentSnapshot = { data: SiteData; revision: number; updatedAt: string };
export const seedData: SiteData = { company, products, branches, promotions, services, fittingPrices };
