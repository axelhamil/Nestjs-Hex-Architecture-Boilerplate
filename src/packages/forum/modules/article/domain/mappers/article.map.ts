import { ArticleDto } from '@article/application/dto/article.dto';
import { Article } from '@article/domain/entities/article';

export class ArticleMap {
  static toDTO(domain: Article): ArticleDto {
    return {
      id: domain.articleId.id.toString(),
      title: domain.title.value,
      description: domain.description.value,
      image: domain.image.value,
    };
  }

  static toDomain(raw: any): Article {
    return Article.create(
      {
        title: raw.title,
        description: raw.description,
        image: raw.image,
      },
      raw.id,
    );
  }

  static toPersistence(domain: Article): any {
    return {
      id: domain.articleId.id.toString(),
      title: domain.title.value,
      description: domain.description.value,
      image: domain.image.value,
    };
  }
}
