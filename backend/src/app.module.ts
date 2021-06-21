import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


import { ConfigModule } from '@nestjs/config';
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

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [AppController, ProductsController, CountriesController, TagsController, ProvincesController, CitiesController, OrdersController, ConnectionTestController, CheckoutController],
  providers: [AppService, GeneralFunctionService, ProductsService, CountriesService],
})
export class AppModule {}
