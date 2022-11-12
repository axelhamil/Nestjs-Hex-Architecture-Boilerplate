import { ArticleController } from '@article/adapters/article.controller';
import { Articles } from '@article/adapters/models/articles.model';
import { TypeORMArticleRepository } from '@article/adapters/repositories/typeORM-article.repository';
import { CreateArticle } from '@article/application/usecases/createArticle.usecase';
import { GetArticles } from '@article/application/usecases/getArticles.usecase';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpErrorFilter } from '@shared/core/HttpErrorFilter';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Articles])],
  controllers: [ArticleController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: 'ArticleRepository',
      useClass: Repository,
    },
    {
      provide: 'IArticleRepository',
      useClass: TypeORMArticleRepository,
    },
    {
      provide: 'CreateArticle',
      useClass: CreateArticle,
    },
    {
      provide: 'GetArticles',
      useClass: GetArticles,
    },
  ],
})
export class ArticleModule {}
