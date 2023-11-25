import { Injectable } from '@nestjs/common';
import {
  RawMaterialItemDto,
  RawMaterialListDto,
} from './dto/get-raw-material-list.dto';
import { RawMaterial } from './data/raw-material.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RawMaterialListService {
  constructor(
    @InjectModel(RawMaterial.name)
    private rawMaterialModel: Model<RawMaterial>,
  ) {}

  async getRawMaterialList() {
    let res = new RawMaterialListDto();
    res.items = new Array<RawMaterialItemDto>();
    const rawMaterials = await this.rawMaterialModel.aggregate([
      {
        $lookup: {
          from: 'categories', 
          localField: 'category',
          foreignField: '_id',
          as: 'categoryDetails',
        },
      },
      {
        $unwind: '$categoryDetails',
      },
      {
        $lookup: {
          from: 'suppliermaterials', 
          localField: '_id',
          foreignField: 'material_id',
          as: 'supplierMaterials',
        },
      },
      {
        $unwind: {
          path: '$supplierMaterials',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'suppliers',
          localField: 'supplierMaterials.supplier_id',
          foreignField: '_id',
          as: 'supplierDetails',
        },
      },
      {
        $unwind: {
          path: '$supplierDetails',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          unit: { $first: '$unit' },
          stock: { $first: '$stock' },
          category: { $first: '$categoryDetails.title' },
          suppliers: {
            $push: {
              title: '$supplierDetails.title',
              price: '$supplierMaterials.price',
            },
          },
        },
      },
      {
        $project: {
          id: '$_id',
          _id:0,
          name: 1,
          unit: 1,
          stock: 1,
          category: 1,
          suppliers: 1,
        },
      },
    ]);

    return { items: rawMaterials };
  }
}
