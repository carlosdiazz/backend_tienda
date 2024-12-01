import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//PROPIO
import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { Role } from './entities/role.entity';
import { Permiso_Accion } from './entities/permiso_accion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permiso_Accion])],
  providers: [RoleResolver, RoleService],
  exports: [TypeOrmModule, RoleService],
})
export class RoleModule {}
