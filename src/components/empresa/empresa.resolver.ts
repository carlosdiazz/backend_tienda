import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

//Propio
import { EmpresaService } from './empresa.service';
import { Empresa } from './entities/empresa.entity';
import { CreateEmpresaInput } from './dto/create-empresa.input';
import { UpdateEmpresaInput } from './dto/update-empresa.input';
import { PaginationArgs, ResponsePropioGQl } from '../../common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { User } from '../users';

@UseGuards(JwtAuthGuard)
@Resolver(() => Empresa)
export class EmpresaResolver {
  constructor(private readonly empresaService: EmpresaService) {}

  @Mutation(() => Empresa)
  public async createEmpresa(
    @CurrentUser([]) user: User,
    @Args('createEmpresaInput') createEmpresaInput: CreateEmpresaInput,
  ): Promise<Empresa> {
    return await this.empresaService.create(createEmpresaInput);
  }

  @Query(() => [Empresa], { name: 'allEmpresa' })
  public async findAll(
    @CurrentUser([]) user: User,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Empresa[]> {
    return await this.empresaService.findAll(paginationArgs);
  }

  @Query(() => Empresa, { name: 'findEmpresa' })
  public async findOne(
    @CurrentUser([]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<Empresa> {
    return await this.empresaService.findOne(id);
  }

  @Mutation(() => Empresa)
  public async updateEmpresa(
    @Args('updateEmpresaInput') updateEmpresaInput: UpdateEmpresaInput,
  ): Promise<Empresa> {
    return await this.empresaService.update(
      updateEmpresaInput.id,
      updateEmpresaInput,
    );
  }

  @Mutation(() => ResponsePropioGQl)
  public async removeEmpresa(
    @CurrentUser([]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<ResponsePropioGQl> {
    return await this.empresaService.remove(id);
  }
}
