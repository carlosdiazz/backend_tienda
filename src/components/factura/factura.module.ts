import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FacturaService } from './factura.service';
import { FacturaResolver } from './factura.resolver';
import { Factura } from './entities/factura.entity';
import { ClientesModule } from '../clientes';

@Module({
  imports: [TypeOrmModule.forFeature([Factura]), ClientesModule],
  providers: [FacturaResolver, FacturaService],
  exports: [FacturaService],
})
export class FacturaModule {}
