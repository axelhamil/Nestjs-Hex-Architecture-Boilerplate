import { ArticleController } from '@article/adapters/article.controller';
import { Articles } from '@article/adapters/models/articles.model';
import { TypeORMArticleRepository } from '@article/adapters/repositories/typeORM-article.repository';
import { CreateArticle } from '@article/application/usecases/createArticle.usecase';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Articles])],
  controllers: [ArticleController],
  providers: [
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
  ],
})
export class ArticleModule {}
