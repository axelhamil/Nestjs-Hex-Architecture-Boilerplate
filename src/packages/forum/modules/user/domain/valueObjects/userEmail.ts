import { DomainError } from '@shared/core/DomainError';
import { ValueObject } from '@shared/domain/ValueObject';
import * as Joi from 'joi';

interface IUserEmailProps {
  readonly value: string;
}

export class UserEmail extends ValueObject<IUserEmailProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: IUserEmailProps) {
    super(props);
  }

  public static create(props: IUserEmailProps): UserEmail {
    return new UserEmail(props);
  }

  protected ensureValidFormat(value: IUserEmailProps): void {
    const joiSchema = Joi.object().keys({
      value: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    });

    const joiResult = joiSchema.validate(value);

    if (joiResult.error)
      throw new DomainError('UserEmail: ' + joiResult.error.details[0].message);
  }
}
