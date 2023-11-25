import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty({
    type: String,
    example: 'عرضه کننده',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

}
