import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ComprobanteService } from './comprobante.service';
import { ComprobanteResolver } from './comprobante.resolver';
import { Comprobante } from './entities/comprobante.entity';
import { FacturaModule } from '../factura';

@Module({
  imports: [TypeOrmModule.forFeature([Comprobante]), FacturaModule],
  providers: [ComprobanteResolver, ComprobanteService],
  exports: [ComprobanteService],
})
export class ComprobanteModule {}
