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
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';
import { RawMaterialService } from './raw-material.service';
import { RawMaterialDto } from './dto/get-raw-material.dto';
import { RawMaterialListDto } from './dto/get-raw-material-list.dto';
import { RawMaterialListService } from './raw-material-list.service';

@ApiTags('RawMaterial')
@ApiBearerAuth()
@Controller('raw-materials')
export class RawMaterialController {
  constructor(
    private readonly RawMaterialService: RawMaterialService,
    private readonly RawMaterialListService: RawMaterialListService
    ) {}

  @Post()
  @ApiBody({
    type: CreateRawMaterialDto,
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() request: CreateRawMaterialDto): Promise<RawMaterialDto> {
   return await this.RawMaterialService.createRawMaterial(request);
  }

  @Get()
  @ApiOperation({summary:'api for returning list of raw material based on given challenge'})
  @ApiResponse({ type: RawMaterialListDto })
  @HttpCode(HttpStatus.OK)
  async getRawMaterialList(): Promise<RawMaterialListDto> {
    return this.RawMaterialListService.getRawMaterialList();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'id of element',
  })
  @ApiResponse({ type: RawMaterialDto })
  @HttpCode(HttpStatus.OK)
  async get(@Param('id') id: string): Promise<RawMaterialDto> {
    return this.RawMaterialService.getRawMaterialDetail(id);
  }

  @Patch()
  @ApiBody({ type: UpdateRawMaterialDto })
  @HttpCode(HttpStatus.OK)
  async update(@Body() request: UpdateRawMaterialDto): Promise<RawMaterialDto> {
    return await this.RawMaterialService.updateRawMaterial(request);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'id of element',
  })
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<void> {
    await this.RawMaterialService.deleteRawMaterial(id);
  }
}
