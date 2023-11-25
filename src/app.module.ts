import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { SupplierModule } from './supplier/supplier.module';
import { RawMaterialModule } from './raw-material/raw-material.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      }),
      inject: [ConfigService],
      imports: [],
    }),
    CategoryModule,
    SupplierModule,
    RawMaterialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
