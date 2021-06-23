import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Colors } from './entities/color.entity';


@Injectable()
export class ColorsService {

  constructor(@InjectRepository(Colors) public colorRepository: Repository<Colors>) {}

  async createColor(color: Colors) {

    if(color.color != ""){
        if(await this.colorRepository.count({ where: { id: 1 } }) == 0){
          await this.colorRepository.save(color);
        }else{
          await this.colorRepository.update(1, color);
        }
    }else{
        return false
    }
        
  }

  async findOne(id: number): Promise<Colors[]> {
    return this.colorRepository.find({ where: { id: id } });
  }

}
