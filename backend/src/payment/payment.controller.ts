import { Controller, Post, Request, HttpCode } from '@nestjs/common';
import { PaymentService } from './payment.service';

const { ApiError, Client, Environment } = require('square');
const { nanoid } = require('nanoid');


@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('pay')
  @HttpCode(200)
  async payment(@Request() req){

    try{

      let payload = JSON.parse(req.body.body)
    const client = new Client({
      environment: Environment.Sandbox,
      accessToken: "EAAAEPl96jPa8QAttcscOgAin1sNr7VymiG-lE6XWBeTOU8pS91GohLtN8fiw_bv",
    });

    const idempotencyKey = req.idempotencyKey || nanoid();
      const payment = {
        idempotencyKey,
        locationId: payload.locationId,
        sourceId: payload.sourceId,
        verificationToken:"",
        // While it's tempting to pass this data from the client
        // Doing so allows bad actor to modify these values
        // Instead, leverage Orders to create an order on the server
        // and pass the Order ID to createPayment rather than raw amounts
        // See Orders documentation: https://developer.squareup.com/docs/orders-api/what-it-does
        amountMoney: {
          // the expected amount is in cents, meaning this is $1.00.
          amount: '100',
          // If you are a non-US account, you must change the currency to match the country in which
          // you are accepting the payment.
          currency: 'USD',
        },
      };

      // VerificationDetails is part of Secure Card Authentication.
      // This part of the payload is highly recommended (and required for some countries)
      // for 'unauthenticated' payment methods like Cards.
      if (payload.verificationToken) {
        payment.verificationToken = payload.verificationToken;
      }

      const { result, statusCode } = await client.paymentsApi.createPayment(
        payment
      );

      return {
        success: true,
        payment: {
          id: result.payment.id,
          status: result.payment.status,
          receiptUrl: result.payment.receiptUrl,
          orderId: result.payment.orderId,
        },
      }

    }catch (ex) {
      
      throw ex; // to attempt retry
      
    }
    

      

  }

}
