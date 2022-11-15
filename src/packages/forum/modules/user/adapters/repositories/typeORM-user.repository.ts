import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserMap } from '../../application/mappers/user.map';
import { IUserRepository } from '../../application/spi/userRepo.interface';
import { User } from '../../domain/entities/user';
import { Users } from '../models/users.model';

@Injectable()
export class TypeORMUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async save(user: User): Promise<void> {
    const rawUser = await UserMap.toPersistence(user);
    try {
      await this.userRepository.save(rawUser);
    } catch (err) {
      if (err.routine === '_bt_check_unique') {
        throw new HttpException(
          `Email ${user.email.value} already exists`,
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(
          `Something went wrong: ${err}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    const rawUser = await this.userRepository.findOneOrFail({
      where: { email },
    });
    return UserMap.toDomain(rawUser);
  }
}
