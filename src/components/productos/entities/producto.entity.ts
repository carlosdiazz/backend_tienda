import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//Propio
import { VALID_ENTITY } from '../../../config';

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
}
