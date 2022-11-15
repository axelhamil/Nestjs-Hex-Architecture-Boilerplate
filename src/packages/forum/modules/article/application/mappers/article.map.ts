import { ArticleCreateDTO } from '@article/application/dto/article-create.dto';
import { Article } from '@article/domain/entities/article';
import { UniqueEntityID } from '@shared/domain/UniqueEntityID';

export class ArticleMap {
  static toDTO(domain: Article): ArticleCreateDTO {
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
      new UniqueEntityID(raw.id),
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
