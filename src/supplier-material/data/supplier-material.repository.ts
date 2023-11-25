import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  SupplierMaterial,
  SupplierMaterialDocument,
} from './supplier-material.schema';
import { ISupplierMaterialRepository } from '../interface/ISupplier-material.repository';

@Injectable()
export default class SupplierMaterialRepository
  implements ISupplierMaterialRepository
{
  constructor(
    @InjectModel(SupplierMaterial.name)
    private SupplierMaterialModel: Model<SupplierMaterialDocument>,
  ) {}

  public async createOne(
    SupplierMaterial: SupplierMaterial,
  ): Promise<SupplierMaterial> {
    const newSupplierMaterial = await this.SupplierMaterialModel.create({
      ...SupplierMaterial,
    });
    await newSupplierMaterial.save();
    return newSupplierMaterial;
  }

  async findOne(id: string): Promise<SupplierMaterial | null> {
    return await this.SupplierMaterialModel.findOne({ _id: id });
  }

  async find(): Promise<Array<SupplierMaterial>> {
    return await this.SupplierMaterialModel.find();
  }

  public async updateOne(id: string, data: Partial<SupplierMaterial>) {
    await this.SupplierMaterialModel.updateOne({ _id: id }, { $set: data });
  }

  async deleteOne(id: string) {
    await this.SupplierMaterialModel.deleteOne({ _id: id });
  }
}
