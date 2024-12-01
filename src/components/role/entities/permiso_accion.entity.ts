import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

//PROPIO
import { Role } from './role.entity';

@Entity({ name: 'permiso_accion' })
@ObjectType({ description: 'Entidad de los permisos con las acciones' })
export class Permiso_Accion {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar', unique: true })
  action: string;

  @ManyToMany(() => Role, (role) => role.permiso_accion, { lazy: true })
  @JoinTable({
    name: 'rol_pe_ac',
  })
  @Field(() => [Role])
  role: Role[];
}
