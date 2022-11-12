import { ArticlesPaginationArgs } from '@article/application/dto/articles-pagination.dto';
import { Article } from '@article/domain/entities/article';
import { ArticleId } from '@article/domain/entities/articleId';
import { ArticleDetails } from '@article/domain/valueObjects/articleDetails';

export type ArticlesResponse = {
  nodes: ArticleDetails[];
  totalCount: number;
};

export interface IArticleRepository {
  delete(articleId: ArticleId | string): Promise<void>;

  exists(articleId: ArticleId | string): Promise<boolean>;

  getAllArticles(args: ArticlesPaginationArgs): Promise<ArticlesResponse>;

  save(article: Article): Promise<void>;
}
