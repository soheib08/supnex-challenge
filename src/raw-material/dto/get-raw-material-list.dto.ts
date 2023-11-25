import { ApiProperty } from '@nestjs/swagger';
import { UnitDto } from './create-raw-material.dto';

export class RawMaterialSupplierItem {
  @ApiProperty({
    type: String,
    example: 'عرضه کننده',
  })
  title: string;

  @ApiProperty({
    type: Number,
    example: 200,
  })
  price: number;
}

export class RawMaterialItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty({
    type: String,
    example: 'گوجه فرنگی',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'سیفیجات',
  })
  category: string;

  @ApiProperty({
    type: UnitDto,
  })
  unit: UnitDto;

  @ApiProperty({
    type: Number,
    example: 200,
  })
  stock: number;

  @ApiProperty({
    type: RawMaterialSupplierItem,
    isArray: true
  })
  suppliers: RawMaterialSupplierItem[]
}

export class RawMaterialListDto {
  @ApiProperty({ type: [RawMaterialItemDto] })
  items: Array<RawMaterialItemDto>;
}
