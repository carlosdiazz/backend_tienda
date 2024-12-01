import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//Propio
import { CreateEmpresaInput } from './dto/create-empresa.input';
import { UpdateEmpresaInput } from './dto/update-empresa.input';
import { Empresa } from './entities/empresa.entity';
import { ResponsePropioGQl } from '../../common';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresaoRepository: Repository<Empresa>,
  ) {}

  public async create(
    createEmpresaInput: CreateEmpresaInput,
  ): Promise<Empresa> {
    throw new BadRequestException('TODO');
  }

  public async findAll(): Promise<Empresa> {
    throw new BadRequestException('TODO');
  }

  public async findOne(id: number): Promise<Empresa> {
    throw new BadRequestException('TODO');
  }

  public async update(
    id: number,
    updateEmpresaInput: UpdateEmpresaInput,
  ): Promise<Empresa> {
    throw new BadRequestException('TODO');
  }

  public async remove(id: number): Promise<ResponsePropioGQl> {
    throw new BadRequestException('TODO');
  }
}
