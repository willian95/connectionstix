import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import sha512 from 'js-sha512';
import utf8 from 'utf8'
import * as https from 'https';
import { info } from 'console';

@Injectable()
export class GeneralFunctionService {

    getHeader(pid=""):any{
        console.log(typeof pid, pid)
        dayjs.extend(utc)

        let utcTime = dayjs().utc().format()
        let requestId = uuidv4().toString();
        let stringToHash = ""

        if(pid != "null" && pid != null){
            if(pid !=  ""){
                stringToHash = process.env.SHARED_SECRET+":"+requestId+":"+utcTime+":"+pid;
            }else{
                stringToHash = process.env.SHARED_SECRET+":"+requestId+":"+utcTime+":";
            }
            
        }else{
            
            stringToHash = process.env.SHARED_SECRET+":"+requestId+":"+utcTime+":";
        }
        

        let raw_hash = sha512.sha512.digest(utf8.encode(stringToHash));

        let buff = Buffer.from(raw_hash);
        let clientHash = buff.toString('base64');
        
        let requestHeader = null
        if(pid != "null" && pid != null){
            if(pid !=  ""){
                requestHeader ={
                    'Content-type':'application/json',
                    'Accept':'application/json',
                    'X-Dtx-Client-Hash':clientHash,
                    'X-Dtx-Client-Id':process.env.CLIENT_ID,
                    'X-Dtx-Request-Id':requestId,
                    'X-Dtx-Timestamp':utcTime,
                    'X-Dtx-profile-id':pid
                };
            }else{
                requestHeader ={
                    'Content-type':'application/json',
                    'Accept':'application/json',
                    'X-Dtx-Client-Hash':clientHash,
                    'X-Dtx-Client-Id':process.env.CLIENT_ID,
                    'X-Dtx-Request-Id':requestId,
                    'X-Dtx-Timestamp':utcTime
                };
            }
        }else{
            requestHeader ={
                'Content-type':'application/json',
                'Accept':'application/json',
                'X-Dtx-Client-Hash':clientHash,
                'X-Dtx-Client-Id':process.env.CLIENT_ID,
                'X-Dtx-Request-Id':requestId,
                'X-Dtx-Timestamp':utcTime
            };
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
