import { ArticleDto } from '@article/application/dto/article.dto';
import { IArticleRepository } from '@article/application/spi/articleRepo.interface';
import { Article } from '@article/domain/entities/article';
import { ArticleMap } from '@article/domain/mappers/article.map';
import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '@shared/core/UseCase';

@Injectable()
export class CreateArticle implements UseCase<ArticleDto, ArticleDto> {
  constructor(
    @Inject('IArticleRepository')
    private readonly articleRepo: IArticleRepository,
  ) {}

  async execute(articleDTO?: ArticleDto): Promise<ArticleDto> {
    const newArticle = Article.create(articleDTO);

    await this.articleRepo.save(newArticle);

    return ArticleMap.toDTO(newArticle);
  }
}
