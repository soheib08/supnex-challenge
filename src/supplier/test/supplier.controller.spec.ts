import { Test, TestingModule } from '@nestjs/testing';
import { SupplierController } from '../supplier.controller';
import { SupplierService } from '../supplier.service';
import { CreateSupplierDto } from '../dto/create-supplier.dto';
import { MongooseModule } from '@nestjs/mongoose';
import { Supplier, SupplierSchema } from '../data/supplier.schema';
import { ISupplierRepository } from '../interface/ISupplier.repository';
import SupplierRepository from '../data/supplier.repository';
import { UpdateSupplierDto } from '../dto/update-supplier.dto';

describe('supplier controller', () => {
  let controller: SupplierController;
  let service: SupplierService;
  let createSupplierDto: CreateSupplierDto = {
    title: 'supplier',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/raw-material'),
        MongooseModule.forFeature([
          { name: Supplier.name, schema: SupplierSchema },
        ]),
      ],
      controllers: [SupplierController],
      providers: [
        {
          provide: ISupplierRepository,
          useClass: SupplierRepository,
        },
        SupplierService,
      ],
    }).compile();

    controller = module.get<SupplierController>(SupplierController);
    service = module.get<SupplierService>(SupplierService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create and return a supplier', async () => {
    let result = await controller.create(createSupplierDto);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('title');
    expect(result.title).toEqual(createSupplierDto.title);
  });

  it('should update a supplier', async () => {
    let result = await controller.create(createSupplierDto);
    let updateSupplierDto: UpdateSupplierDto = {
      id: result.id,
      title: 'supplier updated',
    };
    let updateResult = await controller.update(updateSupplierDto);

    expect(updateResult).toHaveProperty('id');
    expect(updateResult).toHaveProperty('title');
    expect(updateResult.title).toEqual(updateSupplierDto.title);
  });

  it('should delete a supplier', async () => {
    let result = await controller.create(createSupplierDto);
    await service.deleteSupplier(result.id);

    let supplierList = await service.getSupplierList();

    let isDeleted = supplierList.items.every(
      (supplier) => supplier.id !== result.id,
    );
    expect(isDeleted).toEqual(true);
  });

  afterEach(async () => {
    service.getSupplierList().then((result) => {
      result.items.forEach((supplier) => {
        service.deleteSupplier(supplier.id);
      });
    });
  });
});
