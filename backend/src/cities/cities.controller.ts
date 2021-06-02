import { Controller, Get, HttpService, Param } from '@nestjs/common';
import {GeneralFunctionService} from '../general-function/general-function.service'; 


@Controller('cities')
export class CitiesController {

    constructor(private generalFunctionService: GeneralFunctionService, private httpService:HttpService) {}

    @Get('/:country_code/:province_state_code')
    async find(@Param('country_code') country_code: string, @Param('province_state_code') province_state_code: string): Promise<any> {

        try{
            let endpoint ="/geoinfo/countries/"+country_code+"/provinces-states/"+province_state_code+"/cities"

            //let instance = this.generalFunctionService.getInstance()
            //instance.get(process.env.API_URL+endpoint) 

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

}
