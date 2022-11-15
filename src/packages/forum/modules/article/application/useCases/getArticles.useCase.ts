import { ArticlesPaginationArgs } from '@article/application/dto/articles-pagination.dto';
import {
  ArticlesResponse,
  IArticleRepository,
} from '@article/application/spi/articleRepo.interface';
import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '@shared/core/UseCase';

@Injectable()
export class GetArticles
  implements UseCase<ArticlesPaginationArgs, ArticlesResponse>
{
  constructor(
    @Inject('IArticleRepository')
    private readonly articleRepository: IArticleRepository,
  ) {}

  async execute(args: ArticlesPaginationArgs): Promise<ArticlesResponse> {
    return this.articleRepository.getAllArticles(args);
  }
}
