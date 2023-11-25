import { ApiProperty } from '@nestjs/swagger';

export class SupplierMaterialDto {
  @ApiProperty({ example: '6406f19211c2440bc2e12f1b' })
  id: string;

  @ApiProperty({ example: '6406f19211c2440bc2e12f1b' })
  supplier_id: string;

  @ApiProperty({ example: '6406f19211c2440bc2e12f1b' })
  material_id: string;

  @ApiProperty({
    type: Number,
    example: 5,
  })
  stock: number;

  @ApiProperty({
    type: Number,
    example: 5,
  })
  price: number;
}
