import { Ad } from './ad.model';

export interface User {
  id?: number;
  email: string;
  name: string;
  password: string;
  appliedAds: Ad[];
}
