import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProveedorService } from './proveedor.service';
import { ProveedorResolver } from './proveedor.resolver';
import { Proveedor } from './entities/proveedor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proveedor])],
  providers: [ProveedorResolver, ProveedorService],
  exports: [ProveedorService],
})
export class ProveedorModule {}
