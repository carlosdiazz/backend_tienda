import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { VALID_ENTITY } from '../../../config';
import { Inventario } from 'src/components/inventario/entities/inventario.entity';

@Entity({ name: VALID_ENTITY.PROVEEDOR })
@ObjectType()
export class Proveedor {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar' })
  @Field(() => String)
  name: string;

  @Column({ type: 'varchar' })
  @Field(() => String)
  descripcion: string;

  @Column({ type: 'varchar' })
  @Field(() => String)
  direccion: string;

  @Column({ type: 'varchar' })
  @Field(() => String)
  telefono: string;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  activo: boolean;

  @OneToMany(() => Inventario, (inventario) => inventario.proveedor, {
    nullable: true,
  })
  @Field(() => [Inventario], { nullable: true })
  inventario: Inventario[];

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
