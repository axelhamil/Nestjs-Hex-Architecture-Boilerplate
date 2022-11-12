import { Articles } from '@article/adapters/models/articles.model';
import { ArticlesPaginationArgs } from '@article/application/dto/articles-pagination.dto';
import { ArticleMap } from '@article/application/mappers/article.map';
import { ArticleDetailsMap } from '@article/application/mappers/articleDetailsMap';
import {
  ArticlesResponse,
  IArticleRepository,
} from '@article/application/spi/articleRepo.interface';
import { Article } from '@article/domain/entities/article';
import { ArticleId } from '@article/domain/entities/articleId';
import { SortDirection } from '@forumCommon/pagination/dto/pagination.dto';
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
      } catch (error) {
        await this.delete(article.articleId.id.toString());
        throw new Error(error.toString());
      }
    } else {
      await this.articleRepository.update(
        { id: article.articleId.id.toString() },
        rawTypeOrmArticle,
      );
    }
  }

  async getAllArticles(
    args: ArticlesPaginationArgs,
  ): Promise<ArticlesResponse> {
    const qb = this.articleRepository.createQueryBuilder('articles');
    qb.take(args.take);
    qb.skip(args.skip);
    if (args.sortBy && !!args.sortBy.createdAt) {
      qb.addOrderBy(
        'articles.createdAt',
        args.sortBy.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
      );
    }
    if (args.sortBy && args.sortBy.title !== null) {
      qb.addOrderBy(
        'articles.title',
        args.sortBy.title === SortDirection.ASC ? 'ASC' : 'DESC',
      );
    }

    const [rawArticles, totalCount] = await qb.getManyAndCount();

    const nodes = rawArticles.map((rawArticle) =>
      ArticleDetailsMap.toDomain(rawArticle),
    );

    return { nodes, totalCount };
  }
}
