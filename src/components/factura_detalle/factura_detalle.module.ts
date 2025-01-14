import { Module } from '@nestjs/common';
import { FacturaDetalleService } from './factura_detalle.service';
import { FacturaDetalleResolver } from './factura_detalle.resolver';

@Module({
  providers: [FacturaDetalleResolver, FacturaDetalleService],
})
export class FacturaDetalleModule {}
