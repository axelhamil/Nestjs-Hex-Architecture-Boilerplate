import { Entity } from '@shared/domain/Entity';
import { UniqueEntityID } from '@shared/domain/UniqueEntityID';

import { UserCreateDTOInput } from '../../application/dto/user-create.dto';
import { UserEmail } from '../valueObjects/userEmail';
import { UserFirstName } from '../valueObjects/userFirstName';
import { UserLastName } from '../valueObjects/userLastName';
import { UserPassword } from '../valueObjects/userPassword';
import { UserId } from './userId';

export interface IUser {
  userId?: UserId;
  email: UserEmail;
  password: string; // hashed password
  firstName: UserFirstName;
  lastName: UserLastName;
}

export class User extends Entity<IUser> implements IUser {
  private constructor(props: IUser, id) {
    super(props, id);
  }

  get userId(): UserId {
    return UserId.create(this._id);
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get firstName(): UserFirstName {
    return this.props.firstName;
  }

  get lastName(): UserLastName {
    return this.props.lastName;
  }

  public static create(props: UserCreateDTOInput, id?: UniqueEntityID): User {
    const instancePassword = UserPassword.create(props.password);
    return new User(
      {
        email: UserEmail.create({ value: props.email }),
        password: UserPassword.hashPassword(instancePassword),
        firstName: UserFirstName.create({ value: props.firstName }),
        lastName: UserLastName.create({ value: props.lastName }),
      },
      id,
    );
  }
}
