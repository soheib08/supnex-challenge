import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    type: String,
    example: 'سیفیجات',
  })
  @IsNotEmpty()
  @IsString()
  title: string;
}
