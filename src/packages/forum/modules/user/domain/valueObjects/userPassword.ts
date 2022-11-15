import { DomainError } from '@shared/core/DomainError';
import { ValueObject } from '@shared/domain/ValueObject';
import * as bcrypt from 'bcrypt';

const PASSWORD_RE = new RegExp(
  '(?=^.{8,}$)(?=.*\\d)(?=.*[!@#$%^&*]+)(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$',
);
const BCRYPT_PATTERN = new RegExp('^\\$2[ayb]\\$.{56}$');

interface IUserPasswordProps {
  readonly value: string;
}

export class UserPassword extends ValueObject<IUserPasswordProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: IUserPasswordProps) {
    super(props);
  }

  static hashPassword(passwd: UserPassword) {
    const password = passwd.value;
    if (!password.match(BCRYPT_PATTERN)) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    } else {
      throw new DomainError('Password cannot be hashed', 500);
    }
  }

  public static create(password: string): UserPassword {
    return new UserPassword({ value: password });
  }

  protected ensureValidFormat(password: IUserPasswordProps): void {
    if (!password.value.match(PASSWORD_RE)) {
      throw new DomainError(
        'Invalid user password, the password must contains uppercase characters, lowercase characters, numeric characters and special characters, and a length of 8 characters.',
      );
    }
  }
}
