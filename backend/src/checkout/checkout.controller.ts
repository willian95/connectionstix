import { Controller, HttpService, Post, Body } from '@nestjs/common';
import {GeneralFunctionService} from '../general-function/general-function.service'; 

@Controller('checkout')
export class CheckoutController {

    constructor(private generalFunctionService: GeneralFunctionService, private httpService:HttpService){}
    
    @Post('/payment-providers')

    async paymentProviders(@Body() body){
    
        let endpoint ="/commerce/orders/"+body.order_number+"/payment-providers"

        const agent = this.generalFunctionService.getAgent()
        let header = this.generalFunctionService.getHeader();

        let response = await this.httpService.get(process.env.API_URL+endpoint,{
            headers:header,
            httpsAgent: agent
        }).toPromise()

        return response.data

    }


    @Post('/')
    async store(@Body() body): Promise<any> {

        try{
            let endpoint ="/commerce/orders/"+body.order_number+"/authorize"

            const agent = this.generalFunctionService.getAgent()
        
            let header = this.generalFunctionService.getHeader();

            let response = await this.httpService.post(process.env.API_URL+endpoint,{

                "customer" : {
                    "first_name" : body.customer_first_name,
                    "last_name" : body.customer_last_name,
                    "email" : body.customer_email,
                    "phone" : body.phone
                },
                "payment" : {
                    "billing_address" : {
                        "street_line_1" : body.address_line1,
                        "street_line_2" : body.address_line2,
                        "city" : body.city,
                        "province_state" : body.province_state,
                        "postal_zip_code" : body.postal_zip_code,
                        "country" : body.country
                    },
                    "payment_data" : { 
                        "payment_provider_id" : body.payment_provider_id,
                        "data" : body.payment_data 
                    },   
                },
                "delivery_method" : body.ticket_delivery_method
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
