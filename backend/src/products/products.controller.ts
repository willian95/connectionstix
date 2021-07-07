import { Controller, Get, HttpService, Param, Post, Body } from '@nestjs/common';
import {GeneralFunctionService} from '../general-function/general-function.service'; 

@Controller('products')
export class ProductsController {

    constructor(private generalFunctionService: GeneralFunctionService, private httpService:HttpService) {}

    @Get('/all')
    async getAll(): Promise<any> {

        try{
            let endpoint ="/commerce/products"

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

    @Post('/list')
    async getProductList(@Body() body): Promise<any> {

        try{

            let parameterString = ""
            if(this.setParameterString(body).length > 0){
                parameterString += "?"+this.setParameterString(body)
            }
            
            let endpoint ="/commerce/products"+parameterString

            const agent = this.generalFunctionService.getAgent()
        
            let header = this.generalFunctionService.getHeader();
            let response = await this.httpService.get(process.env.API_URL+endpoint, {
                headers:header,
                httpsAgent: agent
            }).toPromise()
            
            return response.data

        }catch(err){

            return err.response.data

        }

        
    }

    setParameterString(body){

        let parameterString = ""
        if(body.country){
            parameterString += "country_code="+body.country 
        }

        if(body.state){
            if(body.country){
                parameterString += "&"
            }
            parameterString += "province_state_code="+body.state 
        }

        if(body.city){
            if(body.city){
                parameterString += "&"
            }
            parameterString += "city_code="+body.city 
        }

        if(body.tag){
            if(parameterString.length > 0){
                parameterString += "&"
            }
            parameterString += "tag_id="+body.tag 
        }

        return parameterString
    }

    @Get(':id')
    async find(@Param('id') id): Promise<any> {

        try{
            let endpoint ="/commerce/products/"+id

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

    @Post('availability')
    async availability(@Body() body){

        try{
           
            let endpoint ="/commerce/products/"+body.id+"/availability"

            var agent = this.generalFunctionService.getAgent()
            let header = this.generalFunctionService.getHeader();

            let response = await this.httpService.post(process.env.API_URL+endpoint,{
                from_date: body.from_date.toString().substring(0, 10), 
                to_date: body.to_date.toString().substring(0, 10), 
                price_types: body.price_types,
                only_available: true
            },{
                headers:header,
                httpsAgent: agent
            }).toPromise()

            return response.data

        }catch(err){

            return err.response.data

        }  

    }

}
