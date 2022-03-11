import { Ad } from './ad.model';

export interface Company {
  id?: number;
  email: string;
  name: string;
  password: string;
  postedAds: Ad[];
}
