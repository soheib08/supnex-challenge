import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SupplierDocument = HydratedDocument<Supplier>;

@Schema()
export class Supplier {
  id: string;

  @Prop({
    required: true,
    type: String,
  })
  title: string;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier).set(
  'versionKey',
  false,
);

SupplierSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
