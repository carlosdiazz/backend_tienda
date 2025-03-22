import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

//Propio
import { VALID_ENTITY } from '../../../config';
import { User } from './../../users/entities/user.entity';

@Entity({ name: VALID_ENTITY.EMPLEADOS })
@ObjectType()
export class Empresa {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar' })
  @Field(() => String)
  name: string;

  @Column({ type: 'varchar' })
  @Field(() => String)
  descripcion: string;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  activo: boolean;

  @Column({ type: 'int', unique: true })
  @Field(() => Int)
  codigo: number;

  @Column({ type: 'varchar', unique: true })
  @Field(() => String)
  cedula: string;

  @Column({ type: 'int' })
  @Field(() => Int)
  sueldo: number;

  @Field(() => Date)
  @Column({ type: 'timestamptz' })
  fecha: Date;

  @Field(() => User, { nullable: true })
  @OneToOne(() => User, (user) => user.empleado, {
    lazy: true,
    nullable: true,
  })
  user?: User;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  update_at: Date;
}
