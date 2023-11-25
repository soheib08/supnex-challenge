import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { RawMaterial, RawMaterialDocument } from './raw-material.schema';
import { IRawMaterialRepository } from '../interface/IRaw-material.repository';

@Injectable()
export default class RawMaterialRepository implements IRawMaterialRepository {
  constructor(
    @InjectModel(RawMaterial.name)
    private rawMaterialModel: Model<RawMaterialDocument>,
  ) {}

  public async createOne(RawMaterial: RawMaterial): Promise<RawMaterial> {
    const newRawMaterial = await this.rawMaterialModel.create({
      ...RawMaterial,
    });
    await newRawMaterial.save();
    return newRawMaterial;
  }

  async findOne(id: string): Promise<RawMaterial | null> {
    return await this.rawMaterialModel.findOne({ _id: id });
  }

  async find(): Promise<Array<RawMaterial>> {
    return await this.rawMaterialModel.find();
  }

  public async updateOne(id: string, data: Partial<RawMaterial>) {
    await this.rawMaterialModel.updateOne({ _id: id }, { $set: data });
  }

  async deleteOne(id: string) {
    await await this.rawMaterialModel.deleteOne({ _id: id });
  }
}
