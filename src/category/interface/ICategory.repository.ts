import { IGenericRepository } from 'src/generic-repository';
import { Category } from '../data/category.schema';

export interface ICategoryRepository extends IGenericRepository<Category> {
  findOne(id: string): Promise<Category>;

  createOne(entity: Category): Promise<Category>;

  updateOne(id: string, entity: Partial<Category>): Promise<void>;

  find(): Promise<Category[]>;

  deleteOne(id: string): void;
}
export const ICategoryRepository = Symbol('ICategoryRepository');
