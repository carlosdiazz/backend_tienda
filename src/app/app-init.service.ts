import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
//PROOPI

import { ROLES } from '../config';
import { Permiso_Accion, RoleService, UsersService } from '../components';

config();
const configService = new ConfigService();

@Injectable()
export class AppInit implements OnModuleInit {
  private readonly logger = new Logger('App-Init-Seeds');

  constructor(
    @InjectRepository(Permiso_Accion)
    private readonly permisoAccionRepository: Repository<Permiso_Accion>,
    private readonly roleService: RoleService,
    private readonly userService: UsersService,
  ) {}

  //? Aqui creo todos los permiso accion por default
  async crear_todos_los_permisos_accion() {
    this.logger.debug('Creando todos los permiso accion');
    const permiso_accion = Object.values(ROLES).map((name) => ({
      action: name,
    }));

    for (const permiso of permiso_accion) {
      const verificar = await this.permisoAccionRepository.findOneBy({
        action: permiso.action,
      });
      if (!verificar) {
        const newPermiso = this.permisoAccionRepository.create({
          action: permiso.action,
        });
        await this.permisoAccionRepository.save(newPermiso);
      }
    }
  }

  //? Aqui obtengo todos los id de las acciones creadas por default
  async obtener_todos_los_ids_permisos_accion(): Promise<number[]> {
    let ids: number[] = [];
    const finAll = await this.permisoAccionRepository.find();
    finAll.map((permiso) => {
      ids.push(permiso.id);
    });
    return ids;
  }

  //? Aqui creo un rol por Default, con el nombre del rol y los permiso que tendra
  //Si ya el permiso existe, siempre actualizar el app para caragr los nuevos roles
  async crear_rol_Default(
    name_rol: string,
    ids_permiso_accion: number[],
  ): Promise<number> {
    const verificar_rol = await this.roleService.findOneByName(name_rol);
    if (!verificar_rol) {
      this.logger.debug(`Creando el Rol: ${name_rol}`);
      const rol = await this.roleService.create({
        descripcion: name_rol,
        name: name_rol,
        permiso_accion: ids_permiso_accion,
      });
      return rol.id;
    } else {
      await this.roleService.update(verificar_rol.id, {
        permiso_accion: ids_permiso_accion,
        descripcion: verificar_rol.descripcion,
        name: verificar_rol.name,
        id: verificar_rol.id,
      });
    }
    return verificar_rol.id;
  }

  //? Creo el Rol Root
  async crear_rol_ROOT_devulve_su_id(): Promise<number> {
    const TODOS_IDS: number[] =
      await this.obtener_todos_los_ids_permisos_accion();
    const NAME_ROOT = 'ROOT';
    const id_root = await this.crear_rol_Default(NAME_ROOT, TODOS_IDS);
    return id_root;
  }

  //? Esta funcion crear El user Root
  async crear_User_ROOT(ids_roles: number[]) {
    const email = configService.get('USER_ROT_API_EMAIL');
    const password = configService.get('USER_ROT_API_PASSWORD');

    const userAdmin = await this.userService.findOneByEmailSinError(email);
    if (!userAdmin) {
      this.logger.debug(`Creando el User: ${email}`);
      await this.userService.create({
        email: email,
        nickname: email,
        password: password,
        role: ids_roles,
        id_empleado: 0, //TODO por defecto tengo que crear primero el Empleado
      });
    }
  }

  //Consultar si existte un admin
  async onModuleInit() {
    //this.logger.debug('INICIO DEL MODULO SEEDS - APP_INIT');
    ////? Creo todos los permisos accion
    //await this.crear_todos_los_permisos_accion();
    ////? Creo el rol ROOT
    //const id_root = await this.crear_rol_ROOT_devulve_su_id();
    ////? Este crea el suuario en caso de ser necesario
    //await this.crear_User_ROOT([id_root]);
    //this.logger.debug('FIN DEL MODULO SEEDS - APP_INIT');
  }
}
