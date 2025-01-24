import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Propio
import { InventarioService } from './inventario.service';
import { InventarioResolver } from './inventario.resolver';
import { Inventario } from './entities/inventario.entity';
import { ProductosModule } from '../productos';

@Module({
  imports: [TypeOrmModule.forFeature([Inventario]), ProductosModule],
  providers: [InventarioResolver, InventarioService],
  exports: [InventarioService],
})
export class InventarioModule {}
