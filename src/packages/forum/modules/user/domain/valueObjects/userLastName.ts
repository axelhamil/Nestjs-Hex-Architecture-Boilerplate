import { DomainError } from '@shared/core/DomainError';
import { ValueObject } from '@shared/domain/ValueObject';
import * as Joi from 'joi';

interface IUserLastNameProps {
  readonly value: string;
}

export class UserLastName extends ValueObject<IUserLastNameProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: IUserLastNameProps) {
    super(props);
  }

  public static create(props: IUserLastNameProps): UserLastName {
    return new UserLastName(props);
  }

  protected ensureValidFormat(value: IUserLastNameProps): void {
    const joiSchema = Joi.object().keys({
      value: Joi.string().min(3).max(50).required(),
    });

    const joiResult = joiSchema.validate(value);

    if (joiResult.error)
      throw new DomainError(
        'UserLastName: ' + joiResult.error.details[0].message,
      );
  }
}
