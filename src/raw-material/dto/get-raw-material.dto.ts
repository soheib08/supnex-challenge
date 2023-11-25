import { ApiProperty } from '@nestjs/swagger';
import { UnitDto } from './create-raw-material.dto';

export class RawMaterialDto {
  @ApiProperty({ example: '6406f19211c2440bc2e12f1b' })
  id: string;

  @ApiProperty({
    type: String,
    example: 'گوجه فرنگی',
  })
  name: string;

  @ApiProperty({
    type: UnitDto,
  })
  unit: UnitDto;
}
