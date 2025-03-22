import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Propio
import { ProductosService } from './productos.service';
import { ProductosResolver } from './productos.resolver';
import { Producto } from './entities/producto.entity';
import { ProveedorModule } from '../proveedor';

@Module({
  imports: [TypeOrmModule.forFeature([Producto]), ProveedorModule],
  providers: [ProductosResolver, ProductosService],
  exports: [ProductosService],
})
export class ProductosModule {}
