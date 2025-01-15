import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { VALID_ENTITY } from '../../../config';

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
}
