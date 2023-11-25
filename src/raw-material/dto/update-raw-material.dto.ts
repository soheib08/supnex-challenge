import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateRawMaterialDto {
  @ApiProperty({ example: '6406f19211c2440bc2e12f1b' })
  @IsMongoId()
  id: string;

  @ApiProperty({
    example: 'گوجه فرنگی',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'گرم',
  })
  @IsOptional()
  @IsString()
  unit_name: string;

  @ApiProperty({
    example: 'gr',
  })
  @IsOptional()
  @IsString()
  unit_symbol: string;
}
