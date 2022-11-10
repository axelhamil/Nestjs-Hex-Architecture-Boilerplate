import { ArticleId } from '@article/domain/entities/articleId';
import { ArticleDescription } from '@article/domain/valueObjects/articleDescription';
import { ArticleImage } from '@article/domain/valueObjects/articleImage';
import { ArticleTitle } from '@article/domain/valueObjects/articleTitle';

export declare interface IArticle {
  id?: ArticleId;
  title: ArticleTitle;
  description: ArticleDescription;
  image: ArticleImage;
}
