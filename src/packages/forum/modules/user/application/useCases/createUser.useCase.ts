import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '@shared/core/UseCase';

import { User } from '../../domain/entities/user';
import { UserCreateDTOInput } from '../dto/user-create.dto';
import { IUserRepository } from '../spi/userRepo.interface';

@Injectable()
export class CreateUser implements UseCase<UserCreateDTOInput, User> {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(userDTO: UserCreateDTOInput): Promise<User> {
    const newUser = User.create(userDTO);

    await this.userRepo.save(newUser);

    return newUser;
  }
}
