import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ _id: false })
export class Unit {
  @Prop()
  symbol: string;

  @Prop()
  name: string;
}

export type UnitDocument = HydratedDocument<Unit>;
export const UnitSchema = SchemaFactory.createForClass(Unit).set(
  'versionKey',
  false,
);

export type RawMaterialDocument = HydratedDocument<RawMaterial>;

@Schema()
export class RawMaterial {
  id: string;

  @Prop({
    required: true,
    type: String,
  })
  name: string;

  @Prop({ type: UnitSchema })
  unit: Unit;

  @Prop({
    type: Number,
  })
  stock: number;
}

export const RawMaterialSchema = SchemaFactory.createForClass(RawMaterial).set(
  'versionKey',
  false,
);

RawMaterialSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
