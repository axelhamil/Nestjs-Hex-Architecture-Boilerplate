import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DomainExceptionFilter } from '@shared/core/ErrorFilter';

import {
  UserCreateDTOInput,
  UserCreateDTOOutput,
} from '../application/dto/user-create.dto';
import { UserMap } from '../application/mappers/user.map';
import { CreateUser } from '../application/useCases/createUser.useCase';

@ApiTags('User')
@Controller({
  path: 'user',
  version: '1',
})
@UseFilters(new DomainExceptionFilter())
export class UserController {
  constructor(
    @Inject('CreateUser')
    private readonly createUserUseCase: CreateUser,
  ) {}

  @Post('/create')
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createUser(
    @Body(new ValidationPipe({ transform: true }))
    userDto: UserCreateDTOInput,
  ): Promise<UserCreateDTOOutput> {
    try {
      const user = await this.createUserUseCase.execute(userDto);

      return UserMap.toDTO(user);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
