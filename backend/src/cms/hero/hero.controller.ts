import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HeroService } from './hero.service';
import { Hero } from './entities/hero.entity';

@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Post('store')
  async store(@Body() hero: Hero) {

    this.heroService.createHero(hero)
    return {success: true}
  }


  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.heroService.findOne(id);
  }

}
