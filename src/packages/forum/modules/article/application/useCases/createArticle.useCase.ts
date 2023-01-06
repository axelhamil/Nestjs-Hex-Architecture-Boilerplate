import { ArticleCreateDTO } from '@article/application/dto/article-create.dto';
import { IArticleRepository } from '@article/application/spi/articleRepo.interface';
import { Article } from '@article/domain/entities/article';
import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '@shared/core/UseCase';

@Injectable()
export class CreateArticle implements UseCase<ArticleCreateDTO, Article> {
  constructor(
    @Inject('IArticleRepository')
    private readonly articleRepo: IArticleRepository,
  ) {}

  async execute(articleDTO: ArticleCreateDTO): Promise<Article> {
    const newArticle = Article.create(articleDTO);

    await this.articleRepo.save(newArticle);

    return newArticle;
  }
}
