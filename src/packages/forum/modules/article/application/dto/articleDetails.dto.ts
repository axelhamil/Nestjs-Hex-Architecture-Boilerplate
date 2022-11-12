import { ApiProperty } from '@nestjs/swagger';

export class ArticleDetailsDto {
  @ApiProperty({
    description: 'The id of the article.',
    example: '5f9f1b9b-5b5b-4b9b-9b9b-5b9b5b9b9b9b',
  })
  id: string;

  @ApiProperty({
    description: 'The title of the article.',
    example: 'Why DDD is Amazing ?',
    minimum: 3,
    maximum: 255,
  })
  title: string;

  @ApiProperty({
    description: 'The description of the article.',
    example:
      'The strategic aspect of DDD aligns software development teams efforts with the interests of the business.',
    minimum: 3,
    maximum: 255,
  })
  description: string;

  @ApiProperty({
    description: 'The link to your image',
    example: 'https://via.placeholder.com/150',
  })
  image: string;

  @ApiProperty({
    description: 'The date of creation of the article.',
    example: '2020-12-12T12:12:12.000Z',
  })
  createdAt: string | Date;

  @ApiProperty({
    description: 'The date of update of the article.',
    example: '2020-12-12T12:12:12.000Z',
  })
  updatedAt: string | Date;
}
