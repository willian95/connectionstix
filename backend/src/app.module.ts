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
import { FilesController } from './cms/files/files.controller';
import { UsersModule } from './users/users.module';
import { ConfigcmsModule } from './cms/configcms/configcms.module';

import { User } from './users/user.entity';
import { Configcms } from './cms/configcms/configcms.entity';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';

const entities = [User, Configcms];


@Module({
  imports: [ConfigModule.forRoot(), HttpModule, TypeOrmModule.forRoot({
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: entities,
    synchronize: true,
  }),
  MulterModule.register({
    dest: './uploads',
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, 'uploads'),
  }),
  ConfigModule,
  UsersModule,
  ConfigcmsModule,
  AuthModule,
  PaymentModule],
  controllers: [AppController, ProductsController, CountriesController, TagsController, ProvincesController, CitiesController, OrdersController, ConnectionTestController, CheckoutController, FilesController],
  providers: [AppService, GeneralFunctionService, ProductsService, CountriesService],
})
export class AppModule {}
