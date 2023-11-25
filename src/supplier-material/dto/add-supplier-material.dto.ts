import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

export class AddSupplierMaterialDto {
  @ApiProperty({ example: '6406f19211c2440bc2e12f1b' })
  @IsMongoId()
  supplier_id: string;

  @ApiProperty({ example: '6406f19211c2440bc2e12f1b' })
  @IsMongoId()
  material_id: string;

  @ApiProperty({
    type: Number,
    example: 5,
  })
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @ApiProperty({
    type: Number,
    example: 5,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
