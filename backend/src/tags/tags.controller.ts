import { Controller, Get, HttpService, Req } from '@nestjs/common';
import {GeneralFunctionService} from '../general-function/general-function.service'; 

@Controller('tags')
export class TagsController {

    constructor(private generalFunctionService: GeneralFunctionService, private httpService:HttpService) {}

    @Get('/all')
    async getAll(@Req() request): Promise<any> {

        try{

            let endpoint ="/commerce/product-tags"

            if(request.query.cityCode != ""){
                endpoint = endpoint+"?city_code="+request.query.cityCode
            }

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
