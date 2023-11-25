import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { RawMaterialController } from '../raw-material.controller';
import { RawMaterialService } from '../raw-material.service';
import { CreateRawMaterialDto } from '../dto/create-raw-material.dto';
import { RawMaterial, RawMaterialSchema } from '../data/raw-material.schema';
import { IRawMaterialRepository } from '../interface/IRaw-material.repository';
import RawMaterialRepository from '../data/raw-material.repository';
import { UpdateRawMaterialDto } from '../dto/update-raw-material.dto';
import { CategoryModule } from '../../category/category.module';
import { CategoryService } from '../../category/category.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RawMaterialListService } from '../raw-material-list.service';
import { SupplierMaterialModule } from '../../supplier-material/supplier-material.module';
import { SupplierMaterialService } from '../../supplier-material/supplier-material.service';
import { SupplierService } from '../../supplier/supplier.service';
import { AddSupplierMaterialDto } from 'src/supplier-material/dto/add-supplier-material.dto';

describe('raw material controller', () => {
  let controller: RawMaterialController;
  let service: RawMaterialService;
  let categoryService: CategoryService;
  let supplierMaterialService: SupplierMaterialService;
  let supplierService: SupplierService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/raw-material-test'),
        MongooseModule.forFeature([
          { name: RawMaterial.name, schema: RawMaterialSchema },
        ]),
        EventEmitterModule.forRoot(),
        SupplierMaterialModule,
        CategoryModule,
      ],
      controllers: [RawMaterialController],
      providers: [
        {
          provide: IRawMaterialRepository,
          useClass: RawMaterialRepository,
        },
        RawMaterialService,
        RawMaterialListService,
      ],
    }).compile();

    controller = module.get<RawMaterialController>(RawMaterialController);
    service = module.get<RawMaterialService>(RawMaterialService);
    categoryService = module.get<CategoryService>(CategoryService);
    supplierMaterialService = module.get<SupplierMaterialService>(SupplierMaterialService);
    supplierService = module.get<SupplierService>(SupplierService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create and return a raw material', async () => {
    let createdCategory = await categoryService.createCategory({
      title: 'category1',
    });

    let createRawMaterialDto: CreateRawMaterialDto = {
      name: 'tomato',
      unit: {
        name: 'kilogram',
        symbol: 'kg',
      },
      category_id: createdCategory.id,
    };

    let result = await controller.create(createRawMaterialDto);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('unit');
    expect(result.name).toEqual(createRawMaterialDto.name);
    expect(result.unit).toMatchObject(createRawMaterialDto.unit);
  });

  it('should update a raw material', async () => {
    let createdCategory = await categoryService.createCategory({
      title: 'category2',
    });

    let createRawMaterialDto: CreateRawMaterialDto = {
      name: 'tomato',
      unit: {
        name: 'kilogram',
        symbol: 'kg',
      },
      category_id: createdCategory.id,
    };
    let result = await controller.create(createRawMaterialDto);
    let updateRawMaterial: UpdateRawMaterialDto = {
      id: result.id,
      name: 'tomato updated',
      unit_name: 'gram',
      unit_symbol: 'gr',
    };
    let updateResult = await controller.update(updateRawMaterial);

    expect(updateResult).toHaveProperty('id');
    expect(updateResult).toHaveProperty('unit');
    expect(updateResult).toHaveProperty('name');
    expect(updateResult.name).toEqual(updateRawMaterial.name);
    expect(updateResult.unit.name).toEqual(updateRawMaterial.unit_name);
    expect(updateResult.unit.symbol).toEqual(updateRawMaterial.unit_symbol);
  });

  it('should delete a raw material', async () => {
    let createdCategory = await categoryService.createCategory({
      title: 'category3',
    });

    let createRawMaterialDto: CreateRawMaterialDto = {
      name: 'tomato',
      unit: {
        name: 'kilogram',
        symbol: 'kg',
      },
      category_id: createdCategory.id,
    };
    let result = await controller.create(createRawMaterialDto);
    await service.deleteRawMaterial(result.id);

    let supplierList = await service.getRawMaterialList();

    let isDeleted = supplierList.items.every(
      (supplier) => supplier.id !== result.id,
    );
    expect(isDeleted).toEqual(true);
  });

  it('should return a list of raw items', async () => {
    let createdCategory = await categoryService.createCategory({title:'category6'})
    let createdMaterial = await service.createRawMaterial({
      name: 'tomato',
      unit: { name: 'gram', symbol: 'gr' },
      category_id: createdCategory.id
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
     await supplierMaterialService.addSupplierMaterial(addSupplierMaterialDto);

    let result = await controller.getRawMaterialList();
    result.items.forEach((material) => {      
      expect(material).toHaveProperty('id');
      expect(material).toHaveProperty('name');
      expect(material).toHaveProperty('unit');
      expect(material).toHaveProperty('stock');
      expect(material).toHaveProperty('suppliers');
      expect(material).toHaveProperty('category');
    });
  });

  afterEach(async () => {
    service.getRawMaterialList().then((result) => {
      result.items.forEach((material) => {
        service.deleteRawMaterial(material.id);
      });
    });
  });
  // categoryService.getCategoryList().then((result) => {
  //   result.items.forEach((category) => {
  //     categoryService.deleteCategory(category.id);
  //   });
  // });
});
