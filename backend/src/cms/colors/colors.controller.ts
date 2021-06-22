import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { Colors } from './entities/color.entity';

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Post('store')
  async store(@Body() color: Colors) {

    this.colorsService.createColor(color)
    return {success: true}
  }


  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.colorsService.findOne(id);
  }

}
