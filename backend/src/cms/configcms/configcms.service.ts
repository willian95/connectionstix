import { Injectable } from '@nestjs/common';
import { Configcms } from './configcms.entity';

@Injectable()
export class ConfigcmsService {

    async create(configcms) {
        if(await  Configcms.count() == 0){

            let configcmsModel = new Configcms
            configcmsModel.color = configcms.color
            if(configcms.hero != ""){
                configcmsModel.hero = configcms.hero
            }
            if(configcms.logo != ""){
                configcmsModel.logo = configcms.logo
            }

            await configcmsModel.save()

        }else{

            let configcmsModel = await Configcms.findOne()

            configcmsModel.color = configcms.color
            if(configcms.hero != ""){
                configcmsModel.hero = configcms.hero
            }
            if(configcms.logo != ""){
                configcmsModel.logo = configcms.logo
            }

            await configcmsModel.save()


        }
        
        

    }

    async getFirst(): Promise<Configcms> {
        return await Configcms.findOne();
    }


}
