import { Injectable } from '@nestjs/common';
import { CreateFacturaDetalleInput } from './dto/create-factura_detalle.input';
import { UpdateFacturaDetalleInput } from './dto/update-factura_detalle.input';

@Injectable()
export class FacturaDetalleService {
  create(createFacturaDetalleInput: CreateFacturaDetalleInput) {
    return 'This action adds a new facturaDetalle';
  }

  findAll() {
    return `This action returns all facturaDetalle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} facturaDetalle`;
  }

  update(id: number, updateFacturaDetalleInput: UpdateFacturaDetalleInput) {
    return `This action updates a #${id} facturaDetalle`;
  }

  remove(id: number) {
    return `This action removes a #${id} facturaDetalle`;
  }
}
