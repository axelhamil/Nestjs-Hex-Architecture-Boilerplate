import { DomainError } from '@shared/core/DomainError';
import { ValueObject } from '@shared/domain/ValueObject';
import * as Joi from 'joi';

interface IArticleTitleProps {
  readonly value: string;
}

export class ArticleTitle extends ValueObject<IArticleTitleProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: IArticleTitleProps) {
    super(props);
  }

  public static create(props: IArticleTitleProps): ArticleTitle {
    return new ArticleTitle(props);
  }

  protected ensureValidFormat(value: IArticleTitleProps): void {
    const joiSchema = Joi.object().keys({
      value: Joi.string().min(3).max(255).allow(null),
    });

    const joiResult = joiSchema.validate(value);

    if (joiResult.error)
      throw new DomainError(
        'ArticleTitle: ' + joiResult.error.details[0].message,
      );
  }
}
