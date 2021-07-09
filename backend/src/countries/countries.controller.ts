import { Controller, Get, HttpService, Req } from '@nestjs/common';
import {GeneralFunctionService} from '../general-function/general-function.service'; 

@Controller('countries')
export class CountriesController {

    constructor(private generalFunctionService: GeneralFunctionService, private httpService:HttpService) {}

    @Get('/all')
    async getAll(@Req() request){

        try{
 
            let orderNumber = request.query
            let endpoint = ""
   
            if(orderNumber.orderNumber != ""){
                endpoint ="/geoinfo/countries?order_number="+orderNumber.orderNumber
            }else{

                endpoint ="/geoinfo/countries"

            }

            let header = this.generalFunctionService.getHeader();
            const agent = this.generalFunctionService.getAgent()

            let response = await this.httpService.get(process.env.API_URL+endpoint, {
                headers:header,
                httpsAgent: agent
            }).toPromise()

            /*console.log(" ")
            console.log(" ")
            console.log(" ")
            console.log("countries")
            console.log(response)
            console.log(" ")
            console.log(" ")
            console.log(" ")
            console.log(" ")*/
        
            return response.data.data

        }catch(err){

            return err.response.data

        }   

        
    }

}
