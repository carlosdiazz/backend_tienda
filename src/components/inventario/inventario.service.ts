import { Injectable } from '@nestjs/common';
import { CreateInventarioInput } from './dto/create-inventario.input';

@Injectable()
export class InventarioService {
  create(createInventarioInput: CreateInventarioInput) {
    return 'This action adds a new inventario';
  }

  findAll() {
    return `This action returns all inventario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventario`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventario`;
  }
}
