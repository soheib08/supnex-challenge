import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { SupplierMaterialController } from '../supplier-material.controller';
import { SupplierMaterialService } from '../supplier-material.service';
import {
  SupplierMaterial,
  SupplierMaterialSchema,
} from '../data/supplier-material.schema';
import { ISupplierMaterialRepository } from '../interface/ISupplier-material.repository';
import SupplierMaterialRepository from '../data/supplier-material.repository';
import { RawMaterialService } from '../../raw-material/raw-material.service';
import { CategoryService } from '../../category/category.service';
import { SupplierService } from '../../supplier/supplier.service';
import { AddSupplierMaterialDto } from '../dto/add-supplier-material.dto';
import { CategoryModule } from '../../category/category.module';
import { RawMaterialModule } from '../../raw-material/raw-material.module';
import { SupplierModule } from '../../supplier/supplier.module';
import { SupplierMaterialPriceDto } from '../dto/material-price.dto';
import { SupplierMaterialStockDto } from '../dto/material-stock.dto';

describe('supplier material controller', () => {
  let controller: SupplierMaterialController;
  let service: SupplierMaterialService;
  let materialService: RawMaterialService;
  let supplierService: SupplierService;
  let categoryService: CategoryService;
  let supplierMaterialRepository: SupplierMaterialRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/raw-material'),
        MongooseModule.forFeature([
          { name: SupplierMaterial.name, schema: SupplierMaterialSchema },
        ]),
        CategoryModule,
        RawMaterialModule,
        SupplierModule,
      ],
      controllers: [SupplierMaterialController],

      providers: [
        SupplierMaterialRepository,
        {
          provide: ISupplierMaterialRepository,
          useClass: SupplierMaterialRepository,
        },
        SupplierMaterialService,
      ],
    }).compile();

    controller = module.get<SupplierMaterialController>(
      SupplierMaterialController,
    );
    service = module.get<SupplierMaterialService>(SupplierMaterialService);
    materialService = module.get<RawMaterialService>(RawMaterialService);
    supplierService = module.get<SupplierService>(SupplierService);
    categoryService = module.get<CategoryService>(CategoryService);
    supplierMaterialRepository = module.get<SupplierMaterialRepository>(
      SupplierMaterialRepository,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add a material for a supplier', async () => {
    let createdMaterial = await materialService.createRawMaterial({
      name: 'tomato',
      unit: { name: 'gram', symbol: 'gr' },
    });
    let createdSupplier = await supplierService.createSupplier({
      title: 'supplier',
    });
    let addSupplierMaterialDto: AddSupplierMaterialDto = {
      material_id: createdMaterial.id,
      supplier_id: createdSupplier.id,
      price: 100,
      stock: 5,
    };
    let result = await controller.add(addSupplierMaterialDto);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('stock');
    expect(result).toHaveProperty('price');
    expect(result.price).toEqual(addSupplierMaterialDto.price);
    expect(result.stock).toEqual(addSupplierMaterialDto.stock);
  });

  it('should change price', async () => {
    let createdMaterial = await materialService.createRawMaterial({
      name: 'tomato',
      unit: { name: 'gram', symbol: 'gr' },
    });
    let createdSupplier = await supplierService.createSupplier({
      title: 'supplier',
    });
    let addSupplierMaterialDto: AddSupplierMaterialDto = {
      material_id: createdMaterial.id,
      supplier_id: createdSupplier.id,
      price: 100,
      stock: 5,
    };
    let createdSupplierMaterial = await controller.add(addSupplierMaterialDto);
    let changePriceDto: SupplierMaterialPriceDto = {
      id: createdSupplierMaterial.id,
      price: 300,
    };
    let result = await controller.changePrice(changePriceDto);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('price');
    expect(result.price).toEqual(changePriceDto.price);
  });

  it('should change  stock', async () => {
    let createdMaterial = await materialService.createRawMaterial({
      name: 'tomato',
      unit: { name: 'gram', symbol: 'gr' },
    });
    let createdSupplier = await supplierService.createSupplier({
      title: 'supplier',
    });
    let addSupplierMaterialDto: AddSupplierMaterialDto = {
      material_id: createdMaterial.id,
      supplier_id: createdSupplier.id,
      price: 100,
      stock: 5,
    };
    let createdSupplierMaterial = await controller.add(addSupplierMaterialDto);
    let changeStockDto: SupplierMaterialStockDto = {
      id: createdSupplierMaterial.id,
      stock: 30,
    };

    let result = await controller.changeStock(changeStockDto);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('stock');
    expect(result.stock).toEqual(changeStockDto.stock);
  });

  afterEach(async () => {
    supplierMaterialRepository.find().then((result) => {
      result.forEach((supplierMaterial) => {
        supplierMaterialRepository.deleteOne(supplierMaterial.id);
      });
    });
    categoryService.getCategoryList().then((result) => {
      result.items.forEach((category) => {
        categoryService.deleteCategory(category.id);
      });
    });
    supplierService.getSupplierList().then((result) => {
      result.items.forEach((supplier) => {
        supplierService.deleteSupplier(supplier.id);
      });
    });

    materialService.getRawMaterialList().then((result) => {
      result.items.forEach((material) => {
        materialService.deleteRawMaterial(material.id);
      });
    });
  });
});
