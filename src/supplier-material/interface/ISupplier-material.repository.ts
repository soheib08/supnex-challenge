import { IGenericRepository } from 'src/generic-repository';
import { SupplierMaterial } from '../data/supplier-material.schema';

export interface ISupplierMaterialRepository extends IGenericRepository<SupplierMaterial> {
  findOne(id: string): Promise<SupplierMaterial>;

  createOne(entity: SupplierMaterial): Promise<SupplierMaterial>;

  updateOne(id: string, entity: Partial<SupplierMaterial>): Promise<void>;

  find(): Promise<SupplierMaterial[]>;

  deleteOne(id: string): void;
}
export const ISupplierMaterialRepository = Symbol('ISupplierMaterialRepository');
