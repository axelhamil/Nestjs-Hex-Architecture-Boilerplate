import { ArticleDto } from '@article/application/dto/article.dto';
import { CreateArticle } from '@article/application/usecases/createArticle.usecase';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Article')
@Controller({
  path: 'article',
  version: '1',
})
export class ArticleController {
  constructor(
    @Inject('CreateArticle')
    private readonly createArticleUseCase: CreateArticle,
  ) {}

  @Post('/create')
  @ApiResponse({ status: 201, description: 'Article created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createArticle(
    @Body(new ValidationPipe({ transform: true })) articleDto: ArticleDto,
  ): Promise<ArticleDto> {
    try {
      return await this.createArticleUseCase.execute(articleDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
