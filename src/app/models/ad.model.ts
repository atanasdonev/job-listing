import { User } from './user.model';

export interface Ad {
  id?: number;
  title: string;
  description: string;
  category: string;
  type: string;
  likes: number;
  candidates: User[];
}
