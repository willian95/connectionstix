import { Controller, Get, HttpService, Param } from '@nestjs/common';
import {GeneralFunctionService} from '../general-function/general-function.service'; 

@Controller('products')
export class ProductsController {

    constructor(private generalFunctionService: GeneralFunctionService, private httpService:HttpService) {}

    @Get('/all')
    async getAll(): Promise<any> {

        try{
            let endpoint ="/commerce/products"

            let instance = this.generalFunctionService.getInstance()
            instance.get(process.env.API_URL+endpoint) 

            const agent = this.generalFunctionService.getAgent()
        
            let header = this.generalFunctionService.getHeader();
          
            let response = await this.httpService.get(process.env.API_URL+endpoint, {
                headers:header,
                httpsAgent: agent
            }).toPromise()
        
            return response.data.data.products

        }catch(err){

            return err.response.data

        }   

        
    }

    @Get(':id')
    async find(@Param('id') id): Promise<any> {

        try{
            let endpoint ="/commerce/products/"+id

            let instance = this.generalFunctionService.getInstance()
            instance.get(process.env.API_URL+endpoint) 

            const agent = this.generalFunctionService.getAgent()
        
            let header = this.generalFunctionService.getHeader();
          
            let response = await this.httpService.get(process.env.API_URL+endpoint, {
                headers:header,
                httpsAgent: agent
            }).toPromise()
        
            return response.data.data

        }catch(err){

            return err.response.data

        }  

    }

    @Get('nearby/:id')
    async nearby(@Param('id') id): Promise<any> {

        try{
            let endpoint ="/commerce/products/"+id+"/nearby"

            let instance = this.generalFunctionService.getInstance()
            instance.get(process.env.API_URL+endpoint) 

            const agent = this.generalFunctionService.getAgent()
        
            let header = this.generalFunctionService.getHeader();
          
            let response = await this.httpService.get(process.env.API_URL+endpoint, {
                headers:header,
                httpsAgent: agent
            }).toPromise()
        
            return response.data.data.products

        }catch(err){

            return err.response.data

        }  

    }

    @Get('availability/:id')
    async availability(@Param('id') id): Promise<any> {

        try{
            let endpoint ="/commerce/products/"+id+"/availability"

            let instance = this.generalFunctionService.getInstance()
            instance.get(process.env.API_URL+endpoint) 

            const agent = this.generalFunctionService.getAgent()
        
            let header = this.generalFunctionService.getHeader();
          
            let response = await this.httpService.get(process.env.API_URL+endpoint, {
                headers:header,
                httpsAgent: agent
            }).toPromise()
        
            return response.data.data.products

        }catch(err){

            return err.response.data

        }  

    }

}
