import { Module } from '@nestjs/common';
import { ComprobanteService } from './comprobante.service';
import { ComprobanteResolver } from './comprobante.resolver';

@Module({
  providers: [ComprobanteResolver, ComprobanteService],
  exports: [ComprobanteService],
})
export class ComprobanteModule {}
