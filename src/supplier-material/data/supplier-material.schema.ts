import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type SupplierMaterialDocument = HydratedDocument<SupplierMaterial>;

@Schema()
export class SupplierMaterial {
  id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Supplier' })
  supplier_id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'RawMaterial' })
  material_id: string;

  @Prop({
    type: Number,
  })
  stock: number;

  @Prop({
    type: Number,
  })
  price: number;
}

export const SupplierMaterialSchema = SchemaFactory.createForClass(
  SupplierMaterial,
).set('versionKey', false);

SupplierMaterialSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
