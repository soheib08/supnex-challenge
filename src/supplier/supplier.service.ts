import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { SupplierItemDto, SupplierListDto } from './dto/get-supplier-list.dto';
import SupplierRepository from './data/supplier.repository';
import { Supplier } from './data/supplier.schema';
import { SupplierDto } from './dto/get-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ISupplierRepository } from './interface/ISupplier.repository';

@Injectable()
export class SupplierService {
  constructor(
    @Inject(ISupplierRepository)
    private supplierRepository: ISupplierRepository,
  ) {}

  async createSupplier(request: CreateSupplierDto) {
    let supplier = new Supplier();
    supplier.title = request.title;
    let createdSupplier = await this.supplierRepository.createOne(supplier);
    return await this.getSupplierDetail(createdSupplier.id);
  }

  async getSupplierList() {
    let foundCategories = await this.supplierRepository.find();

    let res = new SupplierListDto();
    res.items = new Array<SupplierItemDto>();

    for await (const Supplier of foundCategories) {
      res.items.push({
        id: Supplier.id,
        title: Supplier.title,
      });
    }
    return res;
  }

  async getSupplierDetail(id: string): Promise<SupplierDto> {
    let foundSupplier = await this.supplierRepository.findOne(id);
    if (!foundSupplier) throw new NotFoundException('supplier not found');

    let res = new SupplierDto();
    res.id = foundSupplier.id;
    res.title = foundSupplier.title;
    return res;
  }

  async updateSupplier(request: UpdateSupplierDto) {
    let foundSupplier = await this.supplierRepository.findOne(request.id);
    if (!foundSupplier) throw new NotFoundException('supplier not found');

    const update: Partial<Supplier> = {};
    if (request.title) update.title = request.title;

    await this.supplierRepository.updateOne(foundSupplier.id, update);
    return await this.getSupplierDetail(foundSupplier.id);
  }

  async deleteSupplier(id: string) {
    await this.supplierRepository.deleteOne(id);
  }
}
