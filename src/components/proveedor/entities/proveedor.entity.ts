import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { VALID_ENTITY } from '../../../config';

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
