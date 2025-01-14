import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { VALID_ENTITY } from '../../../config';

@Entity({ name: VALID_ENTITY.PROVEEDOR })
@ObjectType()
export class Proveedor {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar' })
  @Field(() => String)
  name: string;

  @Column({ type: 'varchar' })
  @Field(() => String)
  descripcion: string;

  @Column({ type: 'varchar' })
  @Field(() => String)
  direccion: string;

  @Column({ type: 'varchar' })
  @Field(() => String)
  telefono: string;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  activo: boolean;
}
