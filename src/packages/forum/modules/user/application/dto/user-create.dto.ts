import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UserCreateDTOInput {
  @IsOptional()
  @IsString()
  readonly id?: string;

  @IsString()
  @ApiProperty({
    description: 'The email of the user.',
    example: 'hello@email.com',
    nullable: false,
  })
  readonly email: string;

  @IsString()
  @ApiProperty({
    description: 'The password of the user.',
    example: 'HelloThere123!',
    nullable: false,
  })
  readonly password: string;

  @IsString()
  @ApiProperty({
    description: 'The first name of the user.',
    example: 'John',
    nullable: false,
  })
  readonly firstName: string;

  @IsString()
  @ApiProperty({
    description: 'The last name of the user.',
    example: 'Doe',
  })
  readonly lastName: string;
}

export class UserCreateDTOOutput {
  @IsOptional()
  @IsString()
  readonly id?: string;

  @IsString()
  @ApiProperty({
    description: 'The email of the user.',
    example: 'hello@email.com',
    nullable: false,
  })
  readonly email: string;

  @IsString()
  @ApiProperty({
    description: 'The first name of the user.',
    example: 'John',
    nullable: false,
  })
  readonly firstName: string;

  @IsString()
  @ApiProperty({
    description: 'The last name of the user.',
    example: 'Doe',
  })
  readonly lastName: string;
}
