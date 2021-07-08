import { Controller, Get, HttpService, Param, Req } from '@nestjs/common';
import {GeneralFunctionService} from '../general-function/general-function.service';

@Controller('provinces')
export class ProvincesController {

    constructor(private generalFunctionService: GeneralFunctionService, private httpService:HttpService) {}


    @Get(':country_code/')
    async find(@Param('country_code') country_code, @Req() request): Promise<any> {

        try{

            let orderNumber = request.query
            let endpoint = ""
   
            if(orderNumber.orderNumber != ""){
                endpoint ="/geoinfo/countries/"+country_code+"/provinces-states?order_number="+orderNumber.orderNumber
            }else{

                endpoint ="/geoinfo/countries/"+country_code+"/provinces-states"

            }

            const agent = this.generalFunctionService.getAgent()
        
            let header = this.generalFunctionService.getHeader();
          
            let response = await this.httpService.get(process.env.API_URL+endpoint, {
                headers:header,
                httpsAgent: agent
            }).toPromise()

            /*console.log(" ")
            console.log(" ")
            console.log(" ")
            console.log("provinces")
            console.log(endpoint)
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
