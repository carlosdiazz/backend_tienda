import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, DataSource } from 'typeorm';

//PROPIO
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { Permiso_Accion } from './entities/permiso_accion.entity';
import { RoleArgs } from './dto/role-args.input';
import { MESSAGE } from '../../config';
import { User } from '../users';
import { ResponsePropioGQl } from '../../common';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permiso_Accion)
    private readonly permiso_accionRepository: Repository<Permiso_Accion>,
    private readonly dataSource: DataSource,
  ) {}

  public async create(createRoleInput: CreateRoleInput): Promise<Role> {
    try {
      const { permiso_accion, ...rest } = createRoleInput;

      const permisos = await this.permiso_accionRepository.find({
        where: {
          id: In(permiso_accion),
        },
      });
      if (permisos.length == 0) {
        throw new Error(MESSAGE.ESTOS_IDS_DE_ACTION_NO_SON_VALIDOS);
      }

      const newRole = this.roleRepository.create({
        ...rest,
        permiso_accion: permisos,
      });
      await this.roleRepository.save(newRole);
      return await this.findOne(newRole.id);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  public async findAll(paginationArgs: RoleArgs, user: User): Promise<Role[]> {
    const { limit, offset, activo } = paginationArgs;
    const new_user: null | number = user.root === true ? null : user.id;
    return await this.roleRepository.find({
      where: {
        activo,
        user: {
          id: new_user,
        },
      },
      take: limit,
      skip: offset,
      order: { name: 'ASC' },
    });
  }

  public async findAllPermison(user: User): Promise<Permiso_Accion[]> {
    const new_user: null | number = user.root === true ? null : user.id;

    return await this.permiso_accionRepository.find({
      where: {
        role: {
          user: {
            id: new_user,
          },
        },
      },
      order: { action: 'ASC' },
    });
  }

  public async findOne(id: number, user?: User): Promise<Role> {
    const new_user: null | number =
      user?.root === true ? null : (user?.id ?? null);
    const role = await this.roleRepository.findOne({
      where: {
        id,
        user: {
          id: new_user,
        },
      },
      relations: {
        user: {},
      },
    });
    if (!role) {
      throw new NotFoundException(`${MESSAGE.COMUN_ESTE_ID_NO_EXISTE} => Role`);
    }
    // Resolver la promesa manualmente
    const users = await role.user;
    return {
      id: role.id,
      name: role.name,
      activo: role.activo,
      descripcion: role.descripcion,
      permiso_accion: role.permiso_accion,
      user: users,
    };
  }

  public async findOneSolo(id: number): Promise<Role> {
    const role = await this.roleRepository.findOneBy({ id });
    if (!role) {
      throw new NotFoundException(`${MESSAGE.COMUN_ESTE_ID_NO_EXISTE} => Role`);
    }
    return role;
  }

  public async findOneByName(name: string): Promise<Role> {
    const role = await this.roleRepository.findOneBy({ name });
    return role;
  }

  public async update(
    id: number,
    updateRoleInput: UpdateRoleInput,
  ): Promise<Role> {
    const { permiso_accion, ...toUpdate } = updateRoleInput;
    const role = await this.findOneSolo(id);

    if (!(role instanceof Role)) {
      throw new Error('Role no es una instancia de la entidad Role');
    }

    this.roleRepository.merge(role, toUpdate);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (permiso_accion) {
        const permisos = await this.permiso_accionRepository.find({
          where: {
            id: In(permiso_accion),
          },
        });
        if (permisos.length == 0) {
          throw new Error(MESSAGE.ESTOS_IDS_DE_ACTION_NO_SON_VALIDOS);
        }
        role.permiso_accion = permisos;
      }
      await queryRunner.manager.save(role);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return role;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw new UnprocessableEntityException(
        `${MESSAGE.COMUN_NO_SE_PUDO_ACTUALIZAR} => ${error?.message}`,
      );
    }
  }

  public async remove(id: number): Promise<ResponsePropioGQl> {
    const role = await this.findOne(id);

    if (role.user.length >= 1) {
      return {
        message: MESSAGE.COMUN_NO_SE_PUDO_ELIMINAR,
        error: true,
      };
    }

    try {
      await this.roleRepository.remove(role);
      return {
        message: MESSAGE.COMUN_SE_ELIMINO_CORRECTAMENTE,
        error: false,
      };
    } catch (error) {
      return {
        message: MESSAGE.COMUN_NO_SE_PUDO_ELIMINAR,
        error: true,
      };
    }
  }
}
