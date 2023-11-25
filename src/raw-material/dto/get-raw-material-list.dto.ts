import { ApiProperty } from '@nestjs/swagger';
import { UnitDto } from './create-raw-material.dto';

export class RawMaterialItemDto {
  @ApiProperty()
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

export class RawMaterialListDto {
  @ApiProperty({ type: [RawMaterialItemDto] })
  items: Array<RawMaterialItemDto>;
}
