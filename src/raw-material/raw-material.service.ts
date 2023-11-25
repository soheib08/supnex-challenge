import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { RawMaterialDto } from './dto/get-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';
import { RawMaterial, Unit } from './data/raw-material.schema';
import { IRawMaterialRepository } from './interface/IRaw-material.repository';
import { OnEvent } from '@nestjs/event-emitter';
import { StockUpdatedEvent } from './event/stock-updated.event';
import { CategoryService } from '../category/category.service';

@Injectable()
export class RawMaterialService {
  constructor(
    @Inject(IRawMaterialRepository)
    private rawMaterialRepository: IRawMaterialRepository,
    private readonly categoryService: CategoryService,
  ) {}

  async createRawMaterial(request: CreateRawMaterialDto) {
    let foundCategory = await this.categoryService.getCategoryDetail(
      request.category_id,
    );
    if (!foundCategory) throw new NotFoundException('Category not found');

    let rawMaterial = new RawMaterial();
    rawMaterial.name = request.name;
    rawMaterial.unit = request.unit;
    rawMaterial.stock = 0;
    rawMaterial.category = foundCategory.id;
    let createdMaterial = await this.rawMaterialRepository.createOne(
      rawMaterial,
    );
    return await this.getRawMaterialDetail(createdMaterial.id);
  }

  async getRawMaterialList() {
    let foundMaterials = await this.rawMaterialRepository.find();
    return { items: foundMaterials };
  }

  async getRawMaterialDetail(id: string): Promise<RawMaterialDto> {
    let foundRawMaterial = await this.rawMaterialRepository.findOne(id);
    if (!foundRawMaterial) throw new NotFoundException('RawMaterial not found');

    let res = new RawMaterialDto();
    res.id = foundRawMaterial.id;
    res.name = foundRawMaterial.name;
    res.unit = foundRawMaterial.unit;
    return res;
  }

  async updateRawMaterial(request: UpdateRawMaterialDto) {
    let foundRawMaterial = await this.rawMaterialRepository.findOne(request.id);
    if (!foundRawMaterial) throw new NotFoundException('RawMaterial not found');

    const update: Partial<RawMaterial> = {};
    if (request.name) update.name = request.name;
    update.unit = new Unit();
    if (request.unit_name) update.unit.name = request.unit_name;
    if (request.unit_symbol) update.unit.symbol = request.unit_symbol;

    await this.rawMaterialRepository.updateOne(foundRawMaterial.id, update);
    return await this.getRawMaterialDetail(foundRawMaterial.id);
  }

  async deleteRawMaterial(id: string) {
    await this.rawMaterialRepository.deleteOne(id);
  }

  @OnEvent('stock.updated')
  async handleOrderCreatedEvent(event: StockUpdatedEvent) {
    let foundRawMaterial = await this.rawMaterialRepository.findOne(
      event.material_id,
    );
    if (foundRawMaterial) {
      const update: Partial<RawMaterial> = {};
      update.stock = event.stock;
      this.rawMaterialRepository.updateOne(foundRawMaterial.id, update);
    }
  }
}
