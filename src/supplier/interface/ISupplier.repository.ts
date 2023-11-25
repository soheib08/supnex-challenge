import { IGenericRepository } from 'src/generic-repository';
import { Supplier } from '../data/supplier.schema';

export interface ISupplierRepository extends IGenericRepository<Supplier> {
  findOne(id: string): Promise<Supplier>;

  createOne(entity: Supplier): Promise<Supplier>;

  updateOne(id: string, entity: Partial<Supplier>): Promise<void>;

  find(): Promise<Supplier[]>;

  deleteOne(id: string): void;
}
export const ISupplierRepository = Symbol('ISupplierRepository');
