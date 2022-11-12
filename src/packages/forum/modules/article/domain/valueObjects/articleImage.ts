import { DomainError } from '@shared/core/DomainError';
import { ValueObject } from '@shared/domain/ValueObject';
import * as Joi from 'joi';

interface IArticleImageProps {
  readonly value: string;
}

export class ArticleImage extends ValueObject<IArticleImageProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: IArticleImageProps) {
    super(props);
  }

  public static create(props: IArticleImageProps): ArticleImage {
    return new ArticleImage(props);
  }

  protected ensureValidFormat(value: IArticleImageProps): void {
    const joiSchema = Joi.object().keys({
      value: Joi.string().uri().allow(null),
    });

    const joiResult = joiSchema.validate(value);

    if (joiResult.error)
      throw new DomainError(
        'ArticleImage: ' + joiResult.error.details[0].message,
      );
  }
}
