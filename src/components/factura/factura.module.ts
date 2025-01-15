import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FacturaService } from './factura.service';
import { FacturaResolver } from './factura.resolver';
import { Factura } from './entities/factura.entity';
import { ClientesModule } from '../clientes';
import { ProductosModule } from '../productos';
import { FacturaDetalleModule } from '../factura_detalle';

@Module({
  imports: [
    TypeOrmModule.forFeature([Factura]),
    ClientesModule,
    ProductosModule,
    FacturaDetalleModule,
  ],
  providers: [FacturaResolver, FacturaService],
  exports: [FacturaService],
})
export class FacturaModule {}
