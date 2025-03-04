import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Propio
import { InventarioService } from './inventario.service';
import { InventarioResolver } from './inventario.resolver';
import { Inventario } from './entities/inventario.entity';
import { ProductosModule } from '../productos';
import { ProveedorModule } from '../proveedor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inventario]),
    ProductosModule,
    ProveedorModule,
  ],
  providers: [InventarioResolver, InventarioService],
  exports: [InventarioService],
})
export class InventarioModule {}
