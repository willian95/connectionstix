import { Controller, Get, HttpService, Param } from '@nestjs/common';
import {GeneralFunctionService} from '../general-function/general-function.service';

@Controller('provinces')
export class ProvincesController {

    constructor(private generalFunctionService: GeneralFunctionService, private httpService:HttpService) {}


    @Get(':country_code')
    async find(@Param('country_code') country_code): Promise<any> {

        try{
            let endpoint ="/geoinfo/countries/"+country_code+"/provinces-states"

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

}
