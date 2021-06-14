import { Controller , Post, Get, HttpService, Body, Param } from '@nestjs/common';
import {GeneralFunctionService} from '../general-function/general-function.service'; 

@Controller('orders')
export class OrdersController {

    constructor(private generalFunctionService: GeneralFunctionService, private httpService:HttpService) {}


    @Post('/create')
    async create(){

        try{
            let endpoint ="/commerce/orders"

            let header = this.generalFunctionService.getHeader();
            const agent = this.generalFunctionService.getAgent()

            let response = await this.httpService.post(process.env.API_URL+endpoint, {}, {
                headers:header,
                httpsAgent: agent
            }).toPromise()
        
            return response.data.data

        }catch(err){

            return err.response.data

        }   

    }

    @Post('/add-item')
    async addItem(@Body() body){
       
        try{
            let endpoint ="/commerce/orders/"+body.request_number+"/items"

            let header = this.generalFunctionService.getHeader();
            const agent = this.generalFunctionService.getAgent()

            let response = await this.httpService.post(process.env.API_URL+endpoint, {

                product_id: body.product_id,
                price_types: body.price_types,
                from_datetime: body.from_datetime,
                to_datetime: body.to_datetime

            }, {
                headers:header,
                httpsAgent: agent
            }).toPromise()
        
            return response.data.data

        }catch(err){

            return err.response.data

        }  

    }

    @Get('/totals/:request_number')
    async getTotals(@Param('request_number') request_number){

        try{
            let endpoint ="/commerce/orders/"+request_number+"/totals"

            let header = this.generalFunctionService.getHeader();
            const agent = this.generalFunctionService.getAgent()

            let response = await this.httpService.get(process.env.API_URL+endpoint, {
                headers:header,
                httpsAgent: agent
            }).toPromise()
        
            return response.data.data

        }catch(err){

            return err.response.data

        }  

    }

    @Get('/item-list/:request_number')
    async getItemList(@Param('request_number') request_number){

        try{
            let endpoint ="/commerce/orders/"+request_number+"/items"

            let header = this.generalFunctionService.getHeader();
            const agent = this.generalFunctionService.getAgent()

            let response = await this.httpService.get(process.env.API_URL+endpoint, {
                headers:header,
                httpsAgent: agent
            }).toPromise()
        
            return response.data.data

        }catch(err){

            return err.response.data

        }  

    }

    @Get('/item/:request_number/:item_id')
    async getSpecificItem(@Param('request_number') request_number, @Param('item_id') item_id){

        try{
            let endpoint ="/commerce/orders/"+request_number+"/items/"+item_id

            let header = this.generalFunctionService.getHeader();
            const agent = this.generalFunctionService.getAgent()

            let response = await this.httpService.get(process.env.API_URL+endpoint, {
                headers:header,
                httpsAgent: agent
            }).toPromise()
        
            return response.data.data

        }catch(err){

            return err.response.data

        }  

    }

    @Post('item-update')
    async updateItem(@Body() body){

        try{
            let endpoint ="/commerce/orders/"+body.request_number+"/items/"+body.item_id

            let header = this.generalFunctionService.getHeader();
            const agent = this.generalFunctionService.getAgent()

            let response = await this.httpService.put(process.env.API_URL+endpoint,{

                price_types:body.price_types

            },{
                headers:header,
                httpsAgent: agent
            }).toPromise()
        
            return response.data

        }catch(err){

            return err.response.data

        }  

    }

    @Post('item-delete')
    async deleteItem(@Body() body){

        try{
            let endpoint ="/commerce/orders/"+body.request_number+"/items/"+body.item_id

            let header = this.generalFunctionService.getHeader();
            const agent = this.generalFunctionService.getAgent()

            let response = await this.httpService.delete(process.env.API_URL+endpoint,{
                headers:header,
                httpsAgent: agent
            }).toPromise()
        
            return response.data

        }catch(err){

            return err.response.data

        }  

    }

    @Post("discount-order")
    async addDiscountToOrder(@Body() body){

        try{
            let endpoint ="/commerce/orders/"+body.order_number+"/discount"

            let header = this.generalFunctionService.getHeader();
            const agent = this.generalFunctionService.getAgent()

            let response = await this.httpService.post(process.env.API_URL+endpoint,
                {
                    discount_code: body.discount_code
                },
                {
                    headers:header,
                    httpsAgent: agent
                }
            ).toPromise()
        
            return response.data

        }catch(err){

            return err.response.data

        }  

    }

    @Post("discount-item")
    async addDiscountToItem(@Body() body){

        try{
            let endpoint ="/commerce/orders/"+body.order_number+"/items/"+body.item_id+"/discount"

            let header = this.generalFunctionService.getHeader();
            const agent = this.generalFunctionService.getAgent()

            let response = await this.httpService.post(process.env.API_URL+endpoint,
                {
                    discount_code: body.discount_code
                },
                {
                    headers:header,
                    httpsAgent: agent
                }
            ).toPromise()
        
            return response.data

        }catch(err){

            return err.response.data

        }  

    }

    @Get("item-count/:order_number")
    async itemCount(@Param('order_number') order_number){

        try{
            let endpoint ="/commerce/orders/"+order_number+"/items/count"

            let header = this.generalFunctionService.getHeader();
            const agent = this.generalFunctionService.getAgent()

            let response = await this.httpService.get(process.env.API_URL+endpoint,
                {
                    headers:header,
                    httpsAgent: agent
                }
            ).toPromise()
        
            return response.data

        }catch(err){

            return err.response.data

        }  

    }

}
