import { Controller, Get, HttpService } from '@nestjs/common';
import {GeneralFunctionService} from '../general-function/general-function.service'; 

@Controller('countries')
export class CountriesController {

    constructor(private generalFunctionService: GeneralFunctionService, private httpService:HttpService) {}

    @Get('/all')
    async getAll(){

        try{
            let endpoint ="/geoinfo/countries"

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

}
