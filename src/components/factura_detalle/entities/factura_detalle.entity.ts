import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { VALID_ENTITY } from '../../../config';
import { Producto } from '../../../components/productos/entities/producto.entity';
import { Factura } from '../../../components/factura/entities/factura.entity';

@Entity({ name: VALID_ENTITY.FACTURA_DETALLE })
@ObjectType()
export class FacturaDetalle {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  cantidad: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  precio: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  total: number;

  @Field(() => Producto)
  @ManyToOne(() => Producto, (producto) => producto.factura_detalle, {
    lazy: true,
  })
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;

  @Field(() => Factura)
  @ManyToOne(() => Factura, (factura) => factura.factura_detalle, {
    lazy: true,
  })
  @JoinColumn({ name: 'id_factura' })
  factura: Factura;
}
