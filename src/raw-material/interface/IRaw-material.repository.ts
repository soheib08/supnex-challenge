import { IGenericRepository } from 'src/generic-repository';
import { RawMaterial } from '../data/raw-material.schema';

export interface IRawMaterialRepository extends IGenericRepository<RawMaterial> {
  findOne(id: string): Promise<RawMaterial>;

  createOne(entity: RawMaterial): Promise<RawMaterial>;

  updateOne(id: string, entity: Partial<RawMaterial>): Promise<void>;

  find(): Promise<RawMaterial[]>;

  deleteOne(id: string): void;
}
export const IRawMaterialRepository = Symbol('IRawMaterialRepository');
