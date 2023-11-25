import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.schema';
import { ICategoryRepository } from '../interface/ICategory.repository';

@Injectable()
export default class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectModel(Category.name)
    private categoriesModel: Model<CategoryDocument>,
  ) {}

  public async createOne(category: Category): Promise<Category> {
    const newCategory = await this.categoriesModel.create({
      ...category,
    });
    await newCategory.save();
    return newCategory;
  }

  async findOne(id: string): Promise<Category | null> {
    return await this.categoriesModel.findOne({ _id: id });
  }

  async find(): Promise<Array<Category>> {
    return await this.categoriesModel.find();
  }

  public async updateOne(id: string, data: Partial<Category>) {
    await this.categoriesModel.updateOne({ _id: id }, { $set: data });
  }

  async deleteOne(id: string) {
    await this.categoriesModel.deleteOne({ _id: id });
  }
}
