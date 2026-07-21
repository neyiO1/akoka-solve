import { Module } from '@nestjs/common';
import { CsrService } from './csr.service';

@Module({
  providers: [CsrService],
  exports: [CsrService],
})
export class CsrModule {}
