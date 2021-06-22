import { Module } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ColorsController } from './colors.controller';
import { Colors } from './entities/color.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([Colors])
  ],
  controllers: [ColorsController],
  providers: [ColorsService]
})
export class ColorsModule {}
