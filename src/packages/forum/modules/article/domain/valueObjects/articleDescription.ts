import { DomainError } from '@shared/core/DomainError';
import { ValueObject } from '@shared/domain/ValueObject';
import * as Joi from 'joi';

interface IArticleDescriptionProps {
  readonly value: string;
}

export class ArticleDescription extends ValueObject<IArticleDescriptionProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: IArticleDescriptionProps) {
    super(props);
  }

  public static create(props: IArticleDescriptionProps): ArticleDescription {
    return new ArticleDescription(props);
  }

  protected ensureValidFormat(value: IArticleDescriptionProps): void {
    const joiSchema = Joi.object().keys({
      value: Joi.string().min(3).max(1000).allow(null),
    });

    const joiResult = joiSchema.validate(value, {});

    if (joiResult.error)
      throw new DomainError(
        'ArticleDescription: ' + joiResult.error.details[0].message,
      );
  }
}
