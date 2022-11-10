import { Article } from '@article/domain/entities/article';
import { ArticleId } from '@article/domain/entities/articleId';

export interface IArticleRepository {
  delete(articleId: ArticleId | string): Promise<void>;

  exists(articleId: ArticleId | string): Promise<boolean>;

  save(article: Article): Promise<void>;
}
