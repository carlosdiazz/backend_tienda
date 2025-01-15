import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
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

  @Field(() => Factura)
  @ManyToOne(() => Factura, (factura) => factura.comprobante, {
    lazy: true,
  })
  @JoinColumn({ name: 'id_factura' })
  factura: Factura;
}
