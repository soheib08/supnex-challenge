import { ApiProperty } from '@nestjs/swagger';

export class SupplierItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty({
    type: String,
    example: 'عرضه کننده',
  })
  title: string;
}

export class SupplierListDto {
  @ApiProperty({ type: SupplierItemDto, isArray: true })
  items: Array<SupplierItemDto>;
}
