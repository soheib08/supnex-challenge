import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import SupplierRepository from './data/supplier.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Supplier, SupplierSchema } from './data/supplier.schema';
import { SupplierController } from './supplier.controller';
import { ISupplierRepository } from './interface/ISupplier.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Supplier.name, schema: SupplierSchema },
    ]),
  ],
  controllers: [SupplierController],
  providers: [
    SupplierService,
    { provide: ISupplierRepository, useClass: SupplierRepository },
  ],
  exports: [SupplierService],
})
export class SupplierModule {}
