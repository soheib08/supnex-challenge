import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryItemDto, CategoryListDto } from './dto/get-category-list.dto';
import { CategoryDto } from './dto/get-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './data/category.schema';
import { ICategoryRepository } from './interface/ICategory.repository';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(ICategoryRepository)
    private categoryRepository: ICategoryRepository,
  ) {}

  async createCategory(request: CreateCategoryDto) {
    let categoryList = await this.categoryRepository.find();
    let categoryExists = categoryList.find(
      (element) => element.title === request.title,
    );
    if (categoryExists)
      throw new BadRequestException('category with this title already exists');

    let category = new Category();
    category.title = request.title;
    let createdCategory = await this.categoryRepository.createOne(category);
    return await this.getCategoryDetail(createdCategory.id);
  }

  async getCategoryList() {
    let foundCategories = await this.categoryRepository.find();

    let res = new CategoryListDto();
    res.items = new Array<CategoryItemDto>();

    for await (const category of foundCategories) {
      res.items.push({
        id: category.id,
        title: category.title,
      });
    }
    return res;
  }

  async getCategoryDetail(id: string): Promise<CategoryDto> {
    let foundCategory = await this.categoryRepository.findOne(id);
    if (!foundCategory) throw new NotFoundException('category not found');

    let res = new CategoryDto();
    res.id = foundCategory.id;
    res.title = foundCategory.title;
    return res;
  }

  async updateCategory(request: UpdateCategoryDto) {
    let foundCategory = await this.categoryRepository.findOne(request.id);
    if (!foundCategory) throw new NotFoundException('category not found');

    const update: Partial<Category> = {};
    if (request.title) update.title = request.title;

    await this.categoryRepository.updateOne(foundCategory.id, update);

    return await this.getCategoryDetail(foundCategory.id);
  }

  async deleteCategory(id: string) {
    await this.categoryRepository.deleteOne(id);
  }
}
