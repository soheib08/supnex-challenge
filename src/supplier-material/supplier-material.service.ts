import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AddSupplierMaterialDto } from './dto/add-supplier-material.dto';
import { ISupplierMaterialRepository } from './interface/ISupplier-material.repository';
import { SupplierMaterial } from './data/supplier-material.schema';
import { SupplierMaterialStockDto } from './dto/material-stock.dto';
import { SupplierMaterialPriceDto } from './dto/material-price.dto';

@Injectable()
export class SupplierMaterialService {
  constructor(
    @Inject(ISupplierMaterialRepository)
    private supplierMaterialRepository: ISupplierMaterialRepository,
  ) {}

  async addSupplierMaterial(request: AddSupplierMaterialDto) {
    let supplierMaterialList = await this.supplierMaterialRepository.find();

    let foundSuppliersMaterial = supplierMaterialList.find(
      (element) =>
        element.material_id === request.material_id &&
        element.supplier_id === request.supplier_id,
    );
    if (!foundSuppliersMaterial) {
      let supplierMaterial = new SupplierMaterial();
      supplierMaterial.price = request.price;
      supplierMaterial.stock = request.stock;
      supplierMaterial.material_id = request.material_id;
      supplierMaterial.supplier_id = request.supplier_id;
      let createdSupplierMaterial =
        await this.supplierMaterialRepository.createOne(supplierMaterial);
      return this.getSupplierMaterial(createdSupplierMaterial.id);
    } else
      throw new BadRequestException(
        'this material for this supplier already exists',
      );
  }

  async changeStock(request: SupplierMaterialStockDto) {
    let foundSuppliersMaterial = await this.supplierMaterialRepository.findOne(
      request.id,
    );

    if (!foundSuppliersMaterial)
      throw new BadRequestException(
        'this material for this supplier not found',
      );
    else {
      const update: Partial<SupplierMaterial> = {};
      update.stock = request.stock;
      await this.supplierMaterialRepository.updateOne(
        foundSuppliersMaterial.id,
        update,
      );

      return this.getSupplierMaterial(foundSuppliersMaterial.id);
    }
  }

  async changePrice(request: SupplierMaterialPriceDto) {
    let foundSuppliersMaterial = await this.supplierMaterialRepository.findOne(
      request.id,
    );

    if (!foundSuppliersMaterial)
      throw new BadRequestException(
        'this material for this supplier not found',
      );
    else {
      const update: Partial<SupplierMaterial> = {};
      update.price = request.price;
      await this.supplierMaterialRepository.updateOne(
        foundSuppliersMaterial.id,
        update,
      );
      return this.getSupplierMaterial(foundSuppliersMaterial.id);
    }
  }

  async getSupplierMaterial(id: string) {
    return await this.supplierMaterialRepository.findOne(id);
  }
}
