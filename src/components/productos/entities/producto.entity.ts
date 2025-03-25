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

//Propio
import { VALID_ENTITY } from '../../../config';
import { FacturaDetalle } from '../../../components/factura_detalle/entities/factura_detalle.entity';
import { Inventario } from '../../../components/inventario/entities/inventario.entity';
import { Proveedor } from 'src/components/proveedor/entities/proveedor.entity';

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

  //@Column({ type: 'varchar', nullable: true })
  //@Field(() => String, { nullable: true })
  //img_url?: string;

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
  price_de_compra: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  stock: number;

  //Se usara para la alertas
  @Column({ type: 'int' })
  @Field(() => Int)
  stock_minimo: number;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean)
  is_service: boolean;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  is_stock_minimo: boolean;

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

  @Field(() => [Inventario])
  @OneToMany(() => Inventario, (inventario) => inventario.producto, {
    lazy: true,
  })
  inventario: Inventario[];

  //Relaciones
  @Field(() => Proveedor)
  @ManyToOne(() => Proveedor, (provee) => provee.producto, {
    lazy: true,
  })
  @JoinColumn({ name: 'id_producto' })
  proveedor: Proveedor;
}
