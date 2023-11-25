import {
  Controller,
  Body,
  HttpCode,
  HttpStatus,
  Put,
  Post,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { SupplierMaterialStockDto } from './dto/material-stock.dto';
import { SupplierMaterialService } from './supplier-material.service';
import { SupplierMaterialPriceDto } from './dto/material-price.dto';
import { AddSupplierMaterialDto } from './dto/add-supplier-material.dto';
import { SupplierMaterialDto } from './dto/supplier-material.dto';

@ApiTags('SupplierMaterial')
@ApiBearerAuth()
@Controller('supplier-materials')
export class SupplierMaterialController {
  constructor(
    private readonly supplierMaterialService: SupplierMaterialService,
  ) {}

  @Post()
  @ApiBody({
    type: AddSupplierMaterialDto,
  })
  @HttpCode(HttpStatus.CREATED)
  async add(
    @Body() request: AddSupplierMaterialDto,
  ): Promise<SupplierMaterialDto> {
    return await this.supplierMaterialService.addSupplierMaterial(request);
  }

  @Patch()
  @ApiBody({
    type: SupplierMaterialStockDto,
  })
  @HttpCode(HttpStatus.CREATED)
  async changeStock(
    @Body() request: SupplierMaterialStockDto,
  ): Promise<SupplierMaterialDto> {
    return await this.supplierMaterialService.changeStock(request);
  }

  @Patch()
  @ApiBody({
    type: SupplierMaterialPriceDto,
  })
  @HttpCode(HttpStatus.CREATED)
  async changePrice(
    @Body() request: SupplierMaterialPriceDto,
  ): Promise<SupplierMaterialDto> {
    return await this.supplierMaterialService.changePrice(request);
  }
}
