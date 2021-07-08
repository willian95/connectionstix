import { Injectable } from '@nestjs/common';
import { Configcms } from './configcms.entity';

@Injectable()
export class ConfigcmsService {

    async create(configcms) {
        if(await  Configcms.count() == 0){

            let configcmsModel = new Configcms
            configcmsModel.color = configcms.color
            configcmsModel.textColor = configcms.textColor
            configcmsModel.overlay = configcms.overlay ? configcms.overlay : 0
            if(configcms.hero != ""){
                configcmsModel.hero = configcms.hero
            }
            if(configcms.logo != ""){
                configcmsModel.logo = configcms.logo
            }

            if(configcms.secondLogo != ""){
                configcmsModel.secondaryLogo = configcms.secondLogo
            }

            if(configcms.footerLogo != ""){
                configcmsModel.footerLogo = configcms.footerLogo
            }

            await configcmsModel.save()

        }else{

            let configcmsModel = await Configcms.findOne()

            configcmsModel.color = configcms.color
            configcmsModel.textColor = configcms.textColor
            configcmsModel.overlay = configcms.overlay ? configcms.overlay : 0
            if(configcms.hero != ""){
                configcmsModel.hero = configcms.hero
            }
            if(configcms.logo != ""){
                configcmsModel.logo = configcms.logo
            }
            if(configcms.secondLogo != ""){
                configcmsModel.secondaryLogo = configcms.secondLogo
            }

            if(configcms.footerLogo != ""){
                configcmsModel.footerLogo = configcms.footerLogo
            }

            await configcmsModel.save()


        }
        
        

    }

    async getFirst(): Promise<Configcms> {
        return await Configcms.findOne();
    }


}
