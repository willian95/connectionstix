import { Module } from '@nestjs/common';
import { ConfigcmsService } from './configcms.service';
import { ConfigcmsController } from './configcms.controller';

@Module({
  controllers: [ConfigcmsController],
  providers: [ConfigcmsService]
})
export class ConfigcmsModule {}
