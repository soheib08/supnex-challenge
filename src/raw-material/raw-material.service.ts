import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import {
  RawMaterialItemDto,
  RawMaterialListDto,
} from './dto/get-raw-material-list.dto';
import { RawMaterialDto } from './dto/get-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';
import { RawMaterial, Unit } from './data/raw-material.schema';
import { IRawMaterialRepository } from './interface/IRaw-material.repository';

@Injectable()
export class RawMaterialService {
  constructor(
    @Inject(IRawMaterialRepository)
    private rawMaterialRepository: IRawMaterialRepository,
  ) {}

  async createRawMaterial(request: CreateRawMaterialDto) {
    let rawMaterial = new RawMaterial();
    rawMaterial.name = request.name;
    rawMaterial.unit = request.unit;
    let createdMaterial = await this.rawMaterialRepository.createOne(
      rawMaterial,
    );
    return await this.getRawMaterialDetail(createdMaterial.id);
  }

  async getRawMaterialList() {
    let foundMaterials = await this.rawMaterialRepository.find();

    let res = new RawMaterialListDto();
    res.items = new Array<RawMaterialItemDto>();

    for await (const rawMaterial of foundMaterials) {
      res.items.push({
        id: rawMaterial.id,
        name: rawMaterial.name,
        unit: rawMaterial.unit,
      });
    }
    return res;
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
}
