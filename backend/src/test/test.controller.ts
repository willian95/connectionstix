import { Controller, Get } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import sha512 from 'js-sha512';
import utf8 from 'utf8'

@Controller('test')
export class TestController {

    @Get('/all')
    getAllTests(){        
        dayjs.extend(utc)

        let requestId = uuidv4().toString();
        
        let stringToHash = process.env.SHARED_SECRET+":"+requestId+":"+dayjs().utc().format()+":";

        let raw_hash = sha512.sha512.digest(utf8.encode(stringToHash));

        let buff = Buffer.from(raw_hash);
        let clientHash = buff.toString('base64');
        
        return [
            {
                "clientHash": clientHash,
                "requestId": requestId,
                "timestamp": dayjs().utc().format()
            }
        ];

    }

}
