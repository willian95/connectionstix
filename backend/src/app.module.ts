import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GeneralFunctionService } from './general-function/general-function.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { CountriesController } from './countries/countries.controller';
import { CountriesService } from './countries/countries.service';
import { TagsController } from './tags/tags.controller';
import { ProvincesController } from './provinces/provinces.controller';
import { CitiesController } from './cities/cities.controller';
import { OrdersController } from './orders/orders.controller';
import { ConnectionTestController } from './connection-test/connection-test.controller';
import { CheckoutController } from './checkout/checkout.controller';
import { ColorsModule } from './cms/colors/colors.module';
import { FilesController } from './cms/files/files.controller';
import { HeroModule } from './cms/hero/hero.module';


@Module({
  imports: [ConfigModule.forRoot(), HttpModule, TypeOrmModule.forRoot({
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "",
    "database": "connectionstix",
    "autoLoadEntities": true,
    "synchronize": true
  }),
  MulterModule.register({
    dest: './uploads',
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, 'uploads'),
  }),
  ColorsModule,
  HeroModule,
  ConfigModule],
  controllers: [AppController, ProductsController, CountriesController, TagsController, ProvincesController, CitiesController, OrdersController, ConnectionTestController, CheckoutController, FilesController],
  providers: [AppService, GeneralFunctionService, ProductsService, CountriesService],
})
export class AppModule {}
