import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryService } from './category.service';
import { ICategoryRepository } from './interface/ICategory.repository';
import CategoryRepository from './data/category.repository';
import { Category, CategorySchema } from './data/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    { provide: ICategoryRepository, useClass: CategoryRepository },
  ],

  exports: [CategoryService],
})
export class CategoryModule {}
