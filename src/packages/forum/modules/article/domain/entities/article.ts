import { ArticleDto } from '@article/application/dto/article.dto';
import { ArticleId } from '@article/domain/entities/articleId';
import { ArticleDescription } from '@article/domain/valueObjects/articleDescription';
import { ArticleImage } from '@article/domain/valueObjects/articleImage';
import { ArticleTitle } from '@article/domain/valueObjects/articleTitle';
import { IArticle } from '@forumInterfaces/article.interface';
import { Entity } from '@shared/domain/Entity';
import { UniqueEntityID } from '@shared/domain/UniqueEntityID';

export class Article extends Entity<IArticle> implements IArticle {
  private constructor(props: IArticle, id) {
    super(props, id);
  }

  get articleId(): ArticleId {
    return ArticleId.create(this._id);
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

  public updateTitle(newTitle: ArticleTitle): void {
    this.props.title = newTitle;
  }

  public static create(props: ArticleDto, id?: UniqueEntityID): Article {
    return new Article(
      {
        title: ArticleTitle.create({ value: props.title }),
        description: ArticleDescription.create({ value: props.description }),
        image: ArticleImage.create({ value: props.image }),
      },
      id,
    );
  }
}
