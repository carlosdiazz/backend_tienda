import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
//Propio
import { VALID_ENTITY } from '../../../config';

@Entity({ name: VALID_ENTITY.INVENTARIO })
@ObjectType()
export class Inventario {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  existencia: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  existencia_anterior: number;

  @Column({ type: 'varchar' })
  @Field(() => String)
  concepto: string;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  is_ingreso: boolean;

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
