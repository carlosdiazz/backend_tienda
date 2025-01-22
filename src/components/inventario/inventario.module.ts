import { Module } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { InventarioResolver } from './inventario.resolver';

@Module({
  providers: [InventarioResolver, InventarioService],
})
export class InventarioModule {}
