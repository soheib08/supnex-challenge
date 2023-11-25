import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({ example: '6406f19211c2440bc2e12f1b' })
  id: string;

  @ApiProperty({
    type: String,
    example: 'سیفیجات',
  })
  title: string;
}
