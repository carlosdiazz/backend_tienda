import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

//PROPIO
import { VALID_ENTITY } from '../../../config';
import { Role } from '../../../components/role/entities/role.entity';

@Entity({ name: VALID_ENTITY.USER })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', unique: true })
  @Field(() => String)
  nickname: string;

  @Column({ type: 'varchar' })
  @Field(() => String)
  name: string;

  @Column({ type: 'varchar', unique: true })
  @Field(() => String)
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  token: string;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  activo: boolean;

  @Column({ type: 'boolean', default: false })
  root: boolean;

  //Relaciones
  @ManyToMany(() => Role, (role) => role.user, { eager: true })
  @Field(() => [Role])
  role: Role[];

  @BeforeInsert()
  async passwordEncrypt() {
    // Solo actualizar y cifrar la contraseña si se proporciona una nueva
    this.password = await bcrypt.hash(this.password, 10);
  }
}
