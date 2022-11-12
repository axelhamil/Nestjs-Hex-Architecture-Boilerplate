import { ArticleCreateDTO } from '@article/application/dto/article-create.dto';
import {
  ArticlesPaginationArgs,
  ArticlesPaginationDTO,
} from '@article/application/dto/articles-pagination.dto';
import { ArticleMap } from '@article/application/mappers/article.map';
import { ArticleDetailsMap } from '@article/application/mappers/articleDetailsMap';
import { CreateArticle } from '@article/application/usecases/createArticle.usecase';
import { GetArticles } from '@article/application/usecases/getArticles.usecase';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Query,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DomainExceptionFilter } from '@shared/core/ErrorFilter';

@ApiTags('Article')
@Controller({
  path: 'article',
  version: '1',
})
@UseFilters(new DomainExceptionFilter())
export class ArticleController {
  constructor(
    @Inject('CreateArticle')
    private readonly createArticleUseCase: CreateArticle,
    @Inject('GetArticles')
    private readonly getArticlesUseCase: GetArticles,
  ) {}

  @Post('/create')
  @ApiResponse({ status: 201, description: 'Article created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createArticle(
    @Body(new ValidationPipe({ transform: true })) articleDto: ArticleCreateDTO,
  ): Promise<ArticleCreateDTO> {
    try {
      const article = await this.createArticleUseCase.execute(articleDto);

      return ArticleMap.toDTO(article);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('')
  @ApiResponse({ status: 200, description: 'Article are received' })
  async getArticles(
    @Query(
      new ValidationPipe({
        transform: true,
      }),
    )
    args: ArticlesPaginationArgs,
  ): Promise<ArticlesPaginationDTO> {
    try {
      const articles = await this.getArticlesUseCase.execute(args);

      return {
        nodes: articles.nodes.map((article) =>
          ArticleDetailsMap.toDTO(article),
        ),
        totalCount: articles.totalCount,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
