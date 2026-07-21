import { Module } from '@nestjs/common';
import { NyscService } from './nysc.service';
import { NyscController } from './nysc.controller';

@Module({
  controllers: [NyscController],
  providers: [NyscService],
  exports: [NyscService],
})
export class NyscModule {}
