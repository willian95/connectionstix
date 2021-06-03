import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import sha512 from 'js-sha512';
import utf8 from 'utf8'
import * as https from 'https';

@Injectable()
export class GeneralFunctionService {

    getHeader():any{
             
        dayjs.extend(utc)

        let utcTime = dayjs().utc().format()
        let requestId = uuidv4().toString();
        
        let stringToHash = process.env.SHARED_SECRET+":"+requestId+":"+utcTime+":";

        let raw_hash = sha512.sha512.digest(utf8.encode(stringToHash));

        let buff = Buffer.from(raw_hash);
        let clientHash = buff.toString('base64');
        
        let requestHeader ={
            'Content-type':'application/json',
            'Accept':'application/json',
            'X-Dtx-Client-Hash':clientHash,
            'X-Dtx-Client-Id':process.env.CLIENT_ID,
            'X-Dtx-Request-Id':requestId,
            'X-Dtx-Timestamp':utcTime
        }

        return requestHeader
        
    }

    getAgent(){
        let agent = new https.Agent({  
            rejectUnauthorized: false
        });

        return agent
    }


}
