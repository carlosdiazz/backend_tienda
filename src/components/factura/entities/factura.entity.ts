import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { VALID_ENTITY } from '../../../config';
import { Cliente } from '../../../components/clientes/entities/cliente.entity';
import { FacturaDetalle } from '../../../components/factura_detalle/entities/factura_detalle.entity';
import { Comprobante } from '../../../components/comprobante/entities/comprobante.entity';

@Entity({ name: VALID_ENTITY.FACTURA })
@ObjectType()
export class Factura {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  activo: boolean;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  is_credito: boolean;

  @Column({ type: 'int', unique: true })
  @Field(() => Int)
  codigo_factura: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  total_pagado: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  total: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  faltante: number;

  //Realciones
  @Field(() => Cliente, { nullable: true })
  @ManyToOne(() => Cliente, (cliente) => cliente.facturas, {
    lazy: true,
    nullable: true,
  })
  @JoinColumn({ name: 'id_cliente' })
  cliente?: Cliente;

  @Field(() => [FacturaDetalle])
  @OneToMany(() => FacturaDetalle, (facturaDetalle) => facturaDetalle.factura, {
    lazy: true,
  })
  factura_detalle: FacturaDetalle[];

  @Field(() => [Comprobante])
  @OneToMany(() => Comprobante, (comprobante) => comprobante.factura, {
    lazy: true,
  })
  comprobante: Comprobante[];

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
