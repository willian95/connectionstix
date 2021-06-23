import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hero } from './entities/hero.entity';


@Injectable()
export class HeroService {

  constructor(@InjectRepository(Hero) private heroRepository: Repository<Hero>) {}

  async createHero(hero: Hero) {

    if(hero.image != ""){
        if(await this.heroRepository.count({ where: { id: 1 } }) == 0){
          await this.heroRepository.save(hero);
        }else{
          await this.heroRepository.update(1, hero);
        }
    }else{
        return false
    }
        
  }

  async findOne(id: number): Promise<Hero[]> {
    return this.heroRepository.find({ where: { id: id } });
  }

}
