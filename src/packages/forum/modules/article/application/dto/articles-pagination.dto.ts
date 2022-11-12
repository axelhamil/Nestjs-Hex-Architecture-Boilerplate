import { ArticleDetailsDto } from '@article/application/dto/articleDetails.dto';
import {
  Pagination,
  PaginationArgs,
  PaginationSortBy,
  SortDirection,
} from '@forumCommon/pagination/dto/pagination.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class ArticlesPaginationSortBy extends PaginationSortBy {
  @IsEnum(SortDirection)
  @IsOptional()
  @ApiPropertyOptional({
    enum: SortDirection,
    name: 'sortBy[title]',
    default: null,
  })
  title?: SortDirection = null;
}

export class ArticlesPaginationArgs extends PaginationArgs {
  @ValidateNested()
  @IsOptional()
  @IsObject()
  @ApiPropertyOptional({
    type: () => ArticlesPaginationSortBy,
  })
  @Type(() => ArticlesPaginationSortBy)
  sortBy?: ArticlesPaginationSortBy;
}

export class ArticlesPaginationDTO extends Pagination<ArticleDetailsDto> {
  @ApiProperty({
    description: 'The list of articles.',
    type: [ArticleDetailsDto],
  })
  @IsArray()
  nodes: ArticleDetailsDto[];

  @ApiProperty({
    description: 'The total number of articles.',
    type: Number,
  })
  @IsNumber()
  totalCount: number;
}
