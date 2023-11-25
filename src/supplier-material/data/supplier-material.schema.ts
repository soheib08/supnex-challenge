import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SupplierMaterialDocument = HydratedDocument<SupplierMaterial>;

@Schema()
export class SupplierMaterial {
  id: string;

  @Prop({
    required: true,
    type: String,
  })
  supplier_id: string;

  @Prop({
    required: true,
    type: String,
  })
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
