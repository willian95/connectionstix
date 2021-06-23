import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { Hero } from './entities/hero.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([Hero])
  ],
  controllers: [HeroController],
  providers: [HeroService]
})
export class HeroModule {}
