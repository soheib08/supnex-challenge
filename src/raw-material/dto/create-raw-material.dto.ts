import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class UnitDto {
  @ApiProperty({
    type: String,
    example: 'gr',
  })
  @IsNotEmpty()
  @IsString()
  symbol: string;

  @ApiProperty({
    type: String,
    example: 'گرم',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class CreateRawMaterialDto {
  @ApiProperty({
    type: String,
    example: 'گوجه فرنگی',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: UnitDto,
  })
  @ValidateNested()
  @Type(() => UnitDto)
  @IsNotEmpty()
  unit: UnitDto;
}
