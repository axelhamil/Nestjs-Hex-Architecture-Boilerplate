import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PaginationSortBy {
  @IsEnum(SortDirection)
  @IsOptional()
  @ApiPropertyOptional({
    enum: SortDirection,
    name: 'sortBy[createdAt]',
    default: null,
  })
  createdAt?: SortDirection = null;
}

export class PaginationArgs {
  @ApiProperty({
    required: false,
    default: 0,
  })
  @IsNumber()
  @Type(() => Number)
  skip?: number = 0;

  @ApiProperty({
    required: false,
    default: 2,
  })
  @IsNumber()
  @Type(() => Number)
  take?: number = 2;
}

export abstract class Pagination<N> {
  abstract nodes: N[];
}
