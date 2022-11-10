import { Articles } from '@article/adapters/models/articles.model';
import { IArticleRepository } from '@article/application/spi/articleRepo.interface';
import { Article } from '@article/domain/entities/article';
import { ArticleId } from '@article/domain/entities/articleId';
import { ArticleMap } from '@article/domain/mappers/article.map';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class TypeORMArticleRepository implements IArticleRepository {
  constructor(
    @InjectRepository(Articles)
    private articleRepository: Repository<Articles>,
  ) {}

  async delete(articleId: ArticleId | string): Promise<void> {
    articleId =
      articleId instanceof ArticleId ? articleId.id.toString() : articleId;

    await this.articleRepository.delete({
      id: Equal(articleId),
    });
  }

  async exists(articleId: ArticleId | string): Promise<boolean> {
    articleId =
      articleId instanceof ArticleId ? articleId.id.toString() : articleId;

    const rawArticle = await this.articleRepository.findOne({
      where: { id: Equal(articleId) },
    });
    return !!rawArticle;
  }

  async save(article: Article): Promise<void> {
    const exist = await this.exists(article.articleId.id.toString());
    const isNewModule = !exist;
    const rawTypeOrmArticle = await ArticleMap.toPersistence(article);

    if (isNewModule) {
      try {
        await this.articleRepository.save(rawTypeOrmArticle);
      } catch (err) {
        await this.delete(article.articleId.id.toString());
        throw new Error(err.toString());
      }
    }
  }
}
