import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { VALID_ENTITY } from '../../../config';
import { Factura } from '../../../components/factura/entities/factura.entity';

@Entity({ name: VALID_ENTITY.COMPROBANTE })
@ObjectType()
export class Comprobante {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  monto_pagado: number;

  @Column({ type: 'varchar' })
  @Field(() => String)
  concepto: string;

  @Column({ type: 'varchar', default: 'EFECTIVO' })
  @Field(() => String)
  referencia_pago: string;

  @Column({ type: 'varchar', default: 'EFECTIVO' })
  @Field(() => String)
  metodo_pago: string;

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

  @Field(() => Factura)
  @ManyToOne(() => Factura, (factura) => factura.comprobante, {
    lazy: true,
  })
  @JoinColumn({ name: 'id_factura' })
  factura: Factura;
}
