import { ApiProperty } from '@nestjs/swagger';

export class CategoryItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty({
    type: String,
    example: 'سیفیجات',
  })
  title: string;
}

export class CategoryListDto {
  @ApiProperty({ type: [CategoryItemDto] })
  items: Array<CategoryItemDto>;
}
