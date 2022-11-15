import { UniqueEntityID } from '@shared/domain/UniqueEntityID';

import { User } from '../../domain/entities/user';
import { UserCreateDTOOutput } from '../dto/user-create.dto';

export class UserMap {
  static toDTO(domain: User): UserCreateDTOOutput {
    return {
      id: domain.userId.id.toString(),
      email: domain.email.value,
      firstName: domain.firstName.value,
      lastName: domain.lastName.value,
    };
  }

  static toDomain(raw: any): User {
    return User.create(
      {
        email: raw.email,
        password: raw.password,
        firstName: raw.firstName,
        lastName: raw.lastName,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPersistence(domain: User): any {
    return {
      id: domain.userId.id.toString(),
      email: domain.email.value,
      password: domain.password,
      firstName: domain.firstName.value,
      lastName: domain.lastName.value,
    };
  }
}
