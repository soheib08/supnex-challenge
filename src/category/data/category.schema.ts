import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  id: string;

  @Prop({
    required: true,
    type: String,
  })
  title: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category).set(
  'versionKey',
  false,
);

CategorySchema.virtual('id').get(function () {
  return this._id.toHexString();
});
