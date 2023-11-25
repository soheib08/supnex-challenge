import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsNumber } from "class-validator";

export class SupplierMaterialPriceDto {
    @ApiProperty({ example: '6406f19211c2440bc2e12f1b' })
    @IsMongoId()
    id: string;

    @ApiProperty({
      type: Number,
      example: 5,
    })
    @IsNotEmpty()
    @IsNumber()
    price: number;
  }