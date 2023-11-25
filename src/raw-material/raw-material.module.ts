import { Module } from '@nestjs/common';
import { RawMaterialService } from './raw-material.service';
import { RawMaterialController } from './raw-material.controller';
import RawMaterialRepository from './data/raw-material.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { RawMaterial, RawMaterialSchema } from './data/raw-material.schema';
import { IRawMaterialRepository } from './interface/IRaw-material.repository';
import { CategoryModule } from '../category/category.module';
import { RawMaterialListService } from './raw-material-list.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RawMaterial.name, schema: RawMaterialSchema },
    ]),
    CategoryModule
  ],
  controllers: [RawMaterialController],
  providers: [
    RawMaterialService,
    RawMaterialListService,
    { provide: IRawMaterialRepository, useClass: RawMaterialRepository },
  ],
  exports: [RawMaterialService,RawMaterialListService],
})
export class RawMaterialModule {}
