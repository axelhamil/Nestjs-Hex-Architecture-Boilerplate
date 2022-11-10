import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ArticleDto {
  @IsOptional()
  @IsString()
  readonly id?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The title of the article.',
    example: 'Why DDD is Amazing ?',
    minimum: 3,
    maximum: 255,
    nullable: true,
    default: null,
  })
  readonly title: string = null;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The description of the article.',
    example:
      'The strategic aspect of DDD aligns software development teams efforts with the interests of the business.',
    minimum: 3,
    maximum: 255,
    nullable: true,
    default: null,
  })
  readonly description: string = null;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The link to your image',
    example: 'https://via.placeholder.com/150',
    nullable: true,
    default: null,
  })
  readonly image: string = null;
}
