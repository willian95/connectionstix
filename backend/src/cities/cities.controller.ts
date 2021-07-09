import { Controller, Get, HttpService, Param, Req } from '@nestjs/common';
import {GeneralFunctionService} from '../general-function/general-function.service'; 


@Controller('cities')
export class CitiesController {

    constructor(private generalFunctionService: GeneralFunctionService, private httpService:HttpService) {}

    @Get('/:country_code/:province_state_code')
    async find(@Param('country_code') country_code: string, @Param('province_state_code') province_state_code: string, @Req() request): Promise<any> {

        try{

            let orderNumber = request.query
            let endpoint = ""
   
            if(orderNumber.orderNumber != ""){
                endpoint ="/geoinfo/countries/"+country_code+"/provinces-states/"+province_state_code+"/cities?order_number="+orderNumber.orderNumber
            }else{

                endpoint ="/geoinfo/countries/"+country_code+"/provinces-states/"+province_state_code+"/cities"

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
            console.log("cities")
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
