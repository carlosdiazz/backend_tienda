import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

//PROPIO
import { VALID_ENTITY } from '../../../config';
import { Role } from '../../../components/role/entities/role.entity';
import { Empresa } from 'src/components/empleados/entities/empresa.entity';
import { Factura } from 'src/components/factura/entities/factura.entity';

@Entity({ name: VALID_ENTITY.USER })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', unique: true })
  @Field(() => String)
  nickname: string;

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

  //Relaciones
  @Field(() => Empresa, { nullable: true })
  @OneToOne(() => Empresa, (empresa) => empresa.user, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'id_empleado' })
  empleado?: Empresa;

  @Field(() => [Factura])
  @OneToMany(() => Factura, (factur) => factur.user, { lazy: true })
  factura: Factura[];

  @BeforeInsert()
  async passwordEncrypt() {
    // Solo actualizar y cifrar la contraseña si se proporciona una nueva
    this.password = await bcrypt.hash(this.password, 10);
  }
}
