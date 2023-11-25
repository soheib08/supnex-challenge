import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Supplier, SupplierDocument } from './supplier.schema';
import { ISupplierRepository } from '../interface/ISupplier.repository';

@Injectable()
export default class SupplierRepository implements ISupplierRepository {
  constructor(
    @InjectModel(Supplier.name)
    private supplierModel: Model<SupplierDocument>,
  ) {}

  public async createOne(Supplier: Supplier): Promise<Supplier> {
    const newSupplier = await this.supplierModel.create({
      ...Supplier,
    });
    await newSupplier.save();
    return newSupplier;
  }

  async findOne(id: string): Promise<Supplier | null> {
    return await this.supplierModel.findOne({ _id: id });
  }

  async find(): Promise<Array<Supplier>> {
    return await this.supplierModel.find();
  }

  public async updateOne(id: string, data: Partial<Supplier>) {
    await this.supplierModel.updateOne({ _id: id }, { $set: data });
  }

  async deleteOne(id: string) {
    await this.supplierModel.deleteOne({ _id: id });
  }
}
