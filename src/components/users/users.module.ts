import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Propias
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { RoleModule } from '../role';
import { EmpresaModule } from '../empleados';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RoleModule, EmpresaModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
