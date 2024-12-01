import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EmpresaService } from './empresa.service';
import { Empresa } from './entities/empresa.entity';
import { CreateEmpresaInput } from './dto/create-empresa.input';
import { UpdateEmpresaInput } from './dto/update-empresa.input';

@Resolver(() => Empresa)
export class EmpresaResolver {
  constructor(private readonly empresaService: EmpresaService) {}

  @Mutation(() => Empresa)
  createEmpresa(@Args('createEmpresaInput') createEmpresaInput: CreateEmpresaInput) {
    return this.empresaService.create(createEmpresaInput);
  }

  @Query(() => [Empresa], { name: 'empresa' })
  findAll() {
    return this.empresaService.findAll();
  }

  @Query(() => Empresa, { name: 'empresa' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.empresaService.findOne(id);
  }

  @Mutation(() => Empresa)
  updateEmpresa(@Args('updateEmpresaInput') updateEmpresaInput: UpdateEmpresaInput) {
    return this.empresaService.update(updateEmpresaInput.id, updateEmpresaInput);
  }

  @Mutation(() => Empresa)
  removeEmpresa(@Args('id', { type: () => Int }) id: number) {
    return this.empresaService.remove(id);
  }
}
