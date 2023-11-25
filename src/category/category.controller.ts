import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryListDto } from './dto/get-category-list.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/get-category.dto';

@ApiTags('Category')
@ApiBearerAuth()
@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
  ) {}

  @Post()
  @ApiBody({
    type: CreateCategoryDto,
  })
  @HttpCode(HttpStatus.CREATED)
   create(@Body() request: CreateCategoryDto): Promise<CategoryDto> {
    return  this.categoryService.createCategory(request);
  }

  @Get()
  @ApiResponse({ type: CategoryListDto })
  @HttpCode(HttpStatus.OK)
   getList(): Promise<CategoryListDto> {
    return this.categoryService.getCategoryList();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'id of element',
  })
  @ApiResponse({ type: CategoryDto })
  @HttpCode(HttpStatus.OK)
   get(@Param('id') id: string): Promise<CategoryDto> {
    return this.categoryService.getCategoryDetail(id);
  }

  @Patch()
  @ApiBody({ type: UpdateCategoryDto })
  @HttpCode(HttpStatus.OK)
   update(@Body() request: UpdateCategoryDto): Promise<CategoryDto> {
   return  this.categoryService.updateCategory(request);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'id of element',
  })
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<void> {
     this.categoryService.deleteCategory(id);
  }
}
