import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AddSupplierMaterialDto } from './dto/add-supplier-material.dto';
import { ISupplierMaterialRepository } from './interface/ISupplier-material.repository';
import { SupplierMaterial } from './data/supplier-material.schema';
import { SupplierMaterialStockDto } from './dto/material-stock.dto';
import { SupplierMaterialPriceDto } from './dto/material-price.dto';
import { StockUpdatedEvent } from './event/stock-updated.event';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RawMaterialService } from '../raw-material/raw-material.service';
import { SupplierService } from '../supplier/supplier.service';

@Injectable()
export class SupplierMaterialService {
  constructor(
    @Inject(ISupplierMaterialRepository)
    private supplierMaterialRepository: ISupplierMaterialRepository,
    private eventEmitter: EventEmitter2,
    private readonly materialService: RawMaterialService,
    private readonly supplierService: SupplierService,
  ) {}

  async addSupplierMaterial(request: AddSupplierMaterialDto) {
    let supplierMaterialList = await this.supplierMaterialRepository.find();
    let foundRawMaterial = await this.materialService.getRawMaterialDetail(
      request.material_id,
    );
    let foundSupplier = await this.supplierService.getSupplierDetail(
      request.supplier_id,
    );

    let foundSuppliersMaterial = supplierMaterialList.find(
      (element) =>
        element.material_id === request.material_id &&
        element.supplier_id === request.supplier_id,
    );
    if (!foundSuppliersMaterial) {
      let supplierMaterial = new SupplierMaterial();
      supplierMaterial.price = request.price;
      supplierMaterial.stock = request.stock;
      supplierMaterial.material_id = foundRawMaterial.id;
      supplierMaterial.supplier_id = foundSupplier.id;
      let createdSupplierMaterial =
        await this.supplierMaterialRepository.createOne(supplierMaterial);

      const stockUpdatedEvent = new StockUpdatedEvent();
      stockUpdatedEvent.material_id = supplierMaterial.material_id;
      stockUpdatedEvent.stock = await this.calculateMaterialTotalStock(
        stockUpdatedEvent.material_id,
      );
      this.eventEmitter.emit('stock.updated', stockUpdatedEvent);

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

      const stockUpdatedEvent = new StockUpdatedEvent();
      stockUpdatedEvent.material_id = foundSuppliersMaterial.material_id;
      stockUpdatedEvent.stock = await this.calculateMaterialTotalStock(
        stockUpdatedEvent.material_id,
      );
      this.eventEmitter.emit('stock.updated', stockUpdatedEvent);

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

  private async calculateMaterialTotalStock(material_id: string) {
    let foundSupplierMaterials = await this.supplierMaterialRepository.find();
    let materialStocks = foundSupplierMaterials
      .filter((element) => element.material_id.toString() === material_id)
      .map((element) => element.stock);

    let totalStock = 0;
    materialStocks.forEach((stock) => {
      totalStock += stock;
    });
    return totalStock;
  }
}
