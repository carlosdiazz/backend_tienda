import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FacturaDetalleService } from './factura_detalle.service';
import { FacturaDetalle } from './entities/factura_detalle.entity';
import { ProductosModule } from '../productos/productos.module';
@Module({
  imports: [TypeOrmModule.forFeature([FacturaDetalle]), ProductosModule],
  providers: [FacturaDetalleService],
  exports: [FacturaDetalleService],
})
export class FacturaDetalleModule {}
