import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Propio
import { EmpresaService } from './empresa.service';
import { EmpresaResolver } from './empresa.resolver';
import { Empresa } from './entities/empresa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Empresa])],
  providers: [EmpresaResolver, EmpresaService],
  exports: [EmpresaService],
})
export class EmpresaModule {}
