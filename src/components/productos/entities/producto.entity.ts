import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

//Propio
import { VALID_ENTITY } from '../../../config';
import { FacturaDetalle } from 'src/components/factura_detalle/entities/factura_detalle.entity';

@Entity({ name: VALID_ENTITY.PRODUCTO })
@ObjectType()
export class Producto {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar' })
  @Field(() => String)
  name: string;

  @Column({ type: 'varchar' })
  @Field(() => String)
  descripcion: string;

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String, { nullable: true })
  img_url?: string;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  activo: boolean;

  @Column({ type: 'int', unique: true })
  @Field(() => Int)
  codigo: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  price: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  stock: number;

  //Se usara para la alertas
  @Column({ type: 'int' })
  @Field(() => Int)
  stock_minimo: number;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  is_service: boolean;

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

  @Field(() => [FacturaDetalle])
  @OneToMany(
    () => FacturaDetalle,
    (facturaDetalle) => facturaDetalle.producto,
    { lazy: true },
  )
  factura_detalle: FacturaDetalle[];
}
