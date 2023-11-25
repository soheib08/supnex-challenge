import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '../category.controller';
import { CategoryService } from '../category.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { ICategoryRepository } from '../interface/ICategory.repository';
import CategoryRepository from '../data/category.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../data/category.schema';
import { UpdateCategoryDto } from '../dto/update-category.dto';

describe('category controller', () => {
  let controller: CategoryController;
  let service: CategoryService;
  let createCategoryDto: CreateCategoryDto = {
    title: 'category',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/raw-material'),
        MongooseModule.forFeature([
          { name: Category.name, schema: CategorySchema },
        ]),
      ],
      controllers: [CategoryController],
      providers: [
        {
          provide: ICategoryRepository,
          useClass: CategoryRepository,
        },
        CategoryService,
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create category', async () => {
    let result = await controller.create(createCategoryDto);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('title');
    expect(result.title).toEqual(createCategoryDto.title);
  });

  it('should update category', async () => {
    let result = await controller.create(createCategoryDto);
    let updateCategoryDto: UpdateCategoryDto = {
      id: result.id,
      title: 'category updated',
    };
    let updateResult = await controller.update(updateCategoryDto);

    expect(updateResult).toHaveProperty('id');
    expect(updateResult).toHaveProperty('title');
    expect(updateResult.title).toEqual(updateCategoryDto.title);
  });

  it('should delete a category', async () => {
    let result = await controller.create(createCategoryDto);
    await service.deleteCategory(result.id);

    let categoryList = await service.getCategoryList();
    console.log(categoryList);
    
    let isDeleted = categoryList.items.every(
      (category) => category.id !== result.id,
    );
    expect(isDeleted).toEqual(true);
  });

  afterEach(async () => {
    service.getCategoryList().then((result) => {
      result.items.forEach((category) => {
        service.deleteCategory(category.id);
      });
    });
  });
});
