import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { VALID_ENTITY } from '../../../config';
import { Factura } from '../../../components/factura/entities/factura.entity';

@Entity({ name: VALID_ENTITY.CLIENTE })
@ObjectType()
export class Cliente {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar' })
  @Field(() => String)
  name: string;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  activo: boolean;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  is_generico: boolean;

  @Column({ type: 'varchar' })
  @Field(() => String)
  documento: string;

  @Column({ type: 'varchar' })
  @Field(() => String)
  tipo_documento: string;

  @Column({ type: 'varchar' })
  @Field(() => String)
  telefono: string;

  //Relaciones
  @Field(() => [Factura], { nullable: true })
  @OneToMany(() => Factura, (factura) => factura.cliente, {
    lazy: true,
    nullable: true,
  })
  facturas?: Factura[];
}
