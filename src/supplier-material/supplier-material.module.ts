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
import { SupplierModule } from '../supplier/supplier.module';
import { RawMaterialModule } from '../raw-material/raw-material.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SupplierMaterial.name, schema: SupplierMaterialSchema },
    ]),
    SupplierModule,
    RawMaterialModule
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
  exports: [SupplierMaterialService],
})
export class SupplierMaterialModule {}
