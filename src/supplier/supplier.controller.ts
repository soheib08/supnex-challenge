import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierDto } from './dto/get-supplier.dto';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { SupplierListDto } from './dto/get-supplier-list.dto';
import { SupplierService } from './supplier.service';

@ApiTags('Supplier')
@ApiBearerAuth()
@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @ApiBody({
    type: CreateSupplierDto,
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() request: CreateSupplierDto): Promise<SupplierDto> {
    return await this.supplierService.createSupplier(request);
  }

  @Get()
  @ApiResponse({ type: SupplierListDto })
  @HttpCode(HttpStatus.OK)
  async getList(): Promise<SupplierListDto> {
    return this.supplierService.getSupplierList();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'id of element',
  })
  @ApiResponse({ type: SupplierDto })
  @HttpCode(HttpStatus.OK)
  async get(@Param('id') id: string): Promise<SupplierDto> {
    return this.supplierService.getSupplierDetail(id);
  }

  @Patch()
  @ApiBody({ type: UpdateSupplierDto })
  @HttpCode(HttpStatus.OK)
  async update(@Body() request: UpdateSupplierDto): Promise<SupplierDto> {
    return await this.supplierService.updateSupplier(request);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'id of element',
  })
  @HttpCode(HttpStatus.OK)
  async deleteSupplier(@Param('id') id: string): Promise<void> {
    await this.supplierService.deleteSupplier(id);
  }
}
