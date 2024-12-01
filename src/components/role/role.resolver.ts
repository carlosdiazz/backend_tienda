import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards, ParseIntPipe } from '@nestjs/common';

//PROPIO
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Permiso_Accion } from './entities/permiso_accion.entity';
import { PaginationArgs, ResponsePropioGQl } from '../../common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { ROLES } from '../../config';
import { User } from '../users';

@UseGuards(JwtAuthGuard)
@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => Role, {
    name: 'createRol',
    description: 'Para crear un Rol',
  })
  public async createRole(
    @CurrentUser([ROLES.ROLE_CREATE]) user: User,
    @Args('createRoleInput') createRoleInput: CreateRoleInput,
  ): Promise<Role> {
    return this.roleService.create(createRoleInput);
  }

  @Query(() => [Role], { name: 'allRole', description: 'Ver todos los roles' })
  public async findAll(
    @CurrentUser([ROLES.ROLE_VIEW]) user: User,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Role[]> {
    return this.roleService.findAll(paginationArgs, user);
  }

  @Query(() => [Permiso_Accion], {
    name: 'allPermisoAccion',
    description: 'Ver todos los Permisos Accion',
  })
  public async findAllPermiso(
    @CurrentUser([ROLES.ROLE_VIEW]) user: User,
  ): Promise<Permiso_Accion[]> {
    return this.roleService.findAllPermison(user);
  }

  @Query(() => Role, { name: 'findRole', description: 'Ver un rol especifico' })
  public async findOne(
    @CurrentUser([ROLES.ROLE_VIEW]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<Role> {
    return this.roleService.findOne(id, user);
  }

  @Mutation(() => Role, {
    name: 'updateRole',
    description: 'Actualizar un Rol',
  })
  public async updateRole(
    @CurrentUser([ROLES.ROLE_UPDATE]) user: User,
    @Args('updateRoleInput') updateRoleInput: UpdateRoleInput,
  ): Promise<Role> {
    return this.roleService.update(updateRoleInput.id, updateRoleInput);
  }

  @Mutation(() => ResponsePropioGQl, {
    name: 'removeRole',
    description: 'Eliminar un Rol',
  })
  public async removeRole(
    @CurrentUser([ROLES.ROLE_DELETE]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<ResponsePropioGQl> {
    return this.roleService.remove(id);
  }
}
