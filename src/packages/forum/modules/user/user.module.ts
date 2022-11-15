import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpErrorFilter } from '@shared/core/HttpErrorFilter';
import { Repository } from 'typeorm';

import { Users } from './adapters/models/users.model';
import { TypeORMUserRepository } from './adapters/repositories/typeORM-user.repository';
import { UserController } from './adapters/user.controller';
import { CreateUser } from './application/useCases/createUser.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UserController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: 'UserRepository',
      useClass: Repository,
    },
    {
      provide: 'IUserRepository',
      useClass: TypeORMUserRepository,
    },
    {
      provide: 'CreateUser',
      useClass: CreateUser,
    },
  ],
})
export class UserModule {}
