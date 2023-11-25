import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { RawMaterialController } from '../raw-material.controller';
import { RawMaterialService } from '../raw-material.service';
import { CreateRawMaterialDto } from '../dto/create-raw-material.dto';
import { RawMaterial, RawMaterialSchema } from '../data/raw-material.schema';
import { IRawMaterialRepository } from '../interface/IRaw-material.repository';
import RawMaterialRepository from '../data/raw-material.repository';
import { UpdateRawMaterialDto } from '../dto/update-raw-material.dto';

describe('raw material controller', () => {
  let controller: RawMaterialController;
  let service: RawMaterialService;
  let createRawMaterialDto: CreateRawMaterialDto = {
    name: 'tomato',
    unit: {
      name: 'kilogram',
      symbol: 'kg',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/raw-material'),
        MongooseModule.forFeature([
          { name: RawMaterial.name, schema: RawMaterialSchema },
        ]),
      ],
      controllers: [RawMaterialController],
      providers: [
        {
          provide: IRawMaterialRepository,
          useClass: RawMaterialRepository,
        },
        RawMaterialService,
      ],
    }).compile();

    controller = module.get<RawMaterialController>(RawMaterialController);
    service = module.get<RawMaterialService>(RawMaterialService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create and return a raw material', async () => {
    let result = await controller.create(createRawMaterialDto);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('unit');
    expect(result.name).toEqual(createRawMaterialDto.name);
    expect(result.unit).toMatchObject(createRawMaterialDto.unit);
  });

  it('should update a raw material', async () => {
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
    let result = await controller.create(createRawMaterialDto);
    await service.deleteRawMaterial(result.id);

    let supplierList = await service.getRawMaterialList();

    let isDeleted = supplierList.items.every(
      (supplier) => supplier.id !== result.id,
    );
    expect(isDeleted).toEqual(true);
  });

  afterEach(async () => {
    service.getRawMaterialList().then((result) => {
      result.items.forEach((material) => {
        service.deleteRawMaterial(material.id);
      });
    });
  });
});
