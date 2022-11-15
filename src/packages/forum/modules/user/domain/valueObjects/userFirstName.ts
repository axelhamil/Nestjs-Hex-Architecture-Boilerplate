import { DomainError } from '@shared/core/DomainError';
import { ValueObject } from '@shared/domain/ValueObject';
import * as Joi from 'joi';

interface IUserFirstNameProps {
  readonly value: string;
}

export class UserFirstName extends ValueObject<IUserFirstNameProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: IUserFirstNameProps) {
    super(props);
  }

  public static create(props: IUserFirstNameProps): UserFirstName {
    return new UserFirstName(props);
  }

  protected ensureValidFormat(value: IUserFirstNameProps): void {
    const joiSchema = Joi.object().keys({
      value: Joi.string().min(3).max(50).required(),
    });

    const joiResult = joiSchema.validate(value);

    if (joiResult.error)
      throw new DomainError(
        'UserFirstName: ' + joiResult.error.details[0].message,
      );
  }
}
