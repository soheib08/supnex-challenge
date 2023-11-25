import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SupplierMaterial,
  SupplierMaterialSchema,
} from './data/supplier-material.schema';
import { SupplierMaterialController } from './supplier-material.controller';
import { SupplierMaterialService } from './supplier-material.service';
import SupplierMaterialRepository from './data/supplier-material.repository';
import { ISupplierMaterialRepository } from './interface/ISupplier-material.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SupplierMaterial.name, schema: SupplierMaterialSchema },
    ]),
  ],
  controllers: [SupplierMaterialController],
  providers: [
    SupplierMaterialRepository,
    SupplierMaterialService,
    {
      provide: ISupplierMaterialRepository,
      useClass: SupplierMaterialRepository,
    },
  ],
  exports: [],
})
export class SupplierMaterialModule {}
