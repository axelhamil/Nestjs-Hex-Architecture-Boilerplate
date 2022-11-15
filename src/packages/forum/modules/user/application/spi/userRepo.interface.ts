import { User } from '../../domain/entities/user';

export interface IUserRepository {
  getUserByEmail(email: string): Promise<User>;

  save(user: User): Promise<void>;
}
