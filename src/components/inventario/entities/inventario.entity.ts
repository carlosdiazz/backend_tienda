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
//Propio
import { VALID_ENTITY } from '../../../config';
import { Producto } from '../../../components/productos/entities/producto.entity';

@Entity({ name: VALID_ENTITY.INVENTARIO })
@ObjectType()
export class Inventario {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  cantidad: number;

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

  //Relaciones
  @Field(() => Producto)
  @ManyToOne(() => Producto, (producto) => producto.inventario, {
    lazy: true,
  })
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;
}
