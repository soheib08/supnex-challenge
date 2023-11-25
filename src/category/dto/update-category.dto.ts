import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ example: '6406f19211c2440bc2e12f1b' })
  @IsMongoId()
  id: string;

  @ApiProperty({
    example: 'سیفیجات',
  })
  @IsOptional()
  @IsString()
  title: string;
}
