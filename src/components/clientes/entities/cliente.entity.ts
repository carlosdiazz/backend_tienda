import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { VALID_ENTITY } from '../../../config';

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
}
