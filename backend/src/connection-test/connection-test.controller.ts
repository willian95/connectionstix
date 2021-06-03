import { Controller, Get, HttpService} from '@nestjs/common';
import {GeneralFunctionService} from '../general-function/general-function.service'; 

@Controller('connection-test')
export class ConnectionTestController {

    constructor(private generalFunctionService: GeneralFunctionService, private httpService:HttpService) {}

    @Get('/')
    async test(): Promise<any> {

        try{
            let endpoint ="https://api.playtimetickets.com/v1/system/test"

            const agent = this.generalFunctionService.getAgent()
        
            let header = this.generalFunctionService.getHeader();

            return header;
          
            let response = await this.httpService.get(endpoint, {
                headers:header
            }).toPromise()
        
            return response.data

        }catch(err){

            return err

        }  

    }

}
