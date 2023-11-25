import { Module } from '@nestjs/common';
import { RawMaterialService } from './raw-material.service';
import { RawMaterialController } from './raw-material.controller';
import RawMaterialRepository from './data/raw-material.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { RawMaterial, RawMaterialSchema } from './data/raw-material.schema';
import { IRawMaterialRepository } from './interface/IRaw-material.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RawMaterial.name, schema: RawMaterialSchema },
    ]),
  ],
  controllers: [RawMaterialController],
  providers: [
    RawMaterialService,
    { provide: IRawMaterialRepository, useClass: RawMaterialRepository },
  ],
  exports: [RawMaterialService],
})
export class RawMaterialModule {}
