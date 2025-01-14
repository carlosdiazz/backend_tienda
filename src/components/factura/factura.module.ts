import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FacturaService } from './factura.service';
import { FacturaResolver } from './factura.resolver';
import { Factura } from './entities/factura.entity';
import { ClientesModule } from '../clientes';
import { ProductosModule } from '../productos';

@Module({
  imports: [
    TypeOrmModule.forFeature([Factura]),
    ClientesModule,
    ProductosModule,
  ],
  providers: [FacturaResolver, FacturaService],
  exports: [FacturaService],
})
export class FacturaModule {}
