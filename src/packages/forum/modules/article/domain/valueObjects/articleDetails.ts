import { ArticleId } from '@article/domain/entities/articleId';
import { ArticleDescription } from '@article/domain/valueObjects/articleDescription';
import { ArticleImage } from '@article/domain/valueObjects/articleImage';
import { ArticleTitle } from '@article/domain/valueObjects/articleTitle';
import { DomainError } from '@shared/core/DomainError';
import { ValueObject } from '@shared/domain/ValueObject';
import * as Joi from 'joi';

interface ArticleDetailsProps {
  articleId: ArticleId;
  title: ArticleTitle;
  description: ArticleDescription;
  image: ArticleImage;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export class ArticleDetails extends ValueObject<ArticleDetailsProps> {
  private constructor(props: ArticleDetailsProps) {
    super(props);
  }

  get articleId(): ArticleId {
    return this.props.articleId;
  }

  get title(): ArticleTitle {
    return this.props.title;
  }

  get description(): ArticleDescription {
    return this.props.description;
  }

  get image(): ArticleImage {
    return this.props.image;
  }

  get createdAt(): string | Date {
    return this.props.createdAt;
  }

  get updatedAt(): string | Date {
    return this.props.updatedAt;
  }

  public static create(props: ArticleDetailsProps): ArticleDetails {
    return new ArticleDetails(props);
  }

  protected ensureValidFormat(value: ArticleDetailsProps) {
    const joiSchema = Joi.object().keys({
      articleId: {
        _id: Joi.string().required(),
        props: Joi.allow(null),
      },
      title: {
        props: {
          value: Joi.string().allow(null).required(),
        },
      },
      description: {
        props: {
          value: Joi.string().allow(null).required(),
        },
      },
      image: {
        props: {
          value: Joi.string().allow(null).required(),
        },
      },
      createdAt: Joi.date().required(),
      updatedAt: Joi.date().required(),
    });

    const joiResult = joiSchema.validate(value);

    if (joiResult.error)
      throw new DomainError(
        'ArticleDetails: ' + joiResult.error.details[0].message,
        500,
      );
  }
}
