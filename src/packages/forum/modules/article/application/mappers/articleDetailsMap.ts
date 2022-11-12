import { ArticleDetailsDto } from '@article/application/dto/articleDetails.dto';
import { ArticleId } from '@article/domain/entities/articleId';
import { ArticleDescription } from '@article/domain/valueObjects/articleDescription';
import { ArticleDetails } from '@article/domain/valueObjects/articleDetails';
import { ArticleImage } from '@article/domain/valueObjects/articleImage';
import { ArticleTitle } from '@article/domain/valueObjects/articleTitle';

export class ArticleDetailsMap {
  public static toDTO(article: ArticleDetails): ArticleDetailsDto {
    return {
      id: article.articleId.id.toString(),
      title: article.title.value,
      description: article.description.value,
      image: article.image.value,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    };
  }

  public static toDomain(rawArticle: any): ArticleDetails {
    return ArticleDetails.create({
      articleId: ArticleId.create(rawArticle.id),
      title: ArticleTitle.create({ value: rawArticle.title }),
      description: ArticleDescription.create({ value: rawArticle.description }),
      image: ArticleImage.create({ value: rawArticle.image }),
      createdAt: rawArticle.createdAt,
      updatedAt: rawArticle.updatedAt,
    });
  }
}
