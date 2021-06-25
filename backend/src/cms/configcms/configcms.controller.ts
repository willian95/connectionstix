import { Controller, Post, Get, Body } from '@nestjs/common';
import { ConfigcmsService } from './configcms.service';
import { CreateConfigcmsDto } from './dto/configcms.dto';

@Controller('configcms')
export class ConfigcmsController {
  constructor(private readonly configcmsService: ConfigcmsService) {}

  @Post('/store')
  create(@Body() configcms) {
    this.configcmsService.create(configcms);
    return {success: true}
  }

  @Get()
  show() {
    return this.configcmsService.getFirst();
  }

}
