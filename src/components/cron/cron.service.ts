import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TelegramService } from '../telegram';
import { ProductosService } from '../productos';

@Injectable()
export class CronService {
  constructor(
    private telegramService: TelegramService,
    private productosService: ProductosService,
  ) {}
  private readonly logger = new Logger('CronService');

  @Cron('0 * * * *')
  private async verificar_stock() {
    try {
      //this.logger.verbose('Verificando Stock');
      await this.revisar_stock();
    } catch (e) {
      this.logger.error(`Error Revisando Stock ${e}`);
    }
  }

  @Cron('* * * * *')
  private async verificar_stock_minimo() {
    try {
      //this.logger.verbose('Verificando Stock Minimo');
      await this.revisar_stock_minimo();
    } catch (e) {
      this.logger.error(`Error Revisando Stock ${e}`);
    }
  }

  private async revisar_stock() {
    const products = await this.productosService.findAll({
      activo: true,
      limit: 9999,
      offset: 0,
    });
    let message = '';
    for (const product of products) {
      if (product.is_service) {
        continue;
      } else {
        if (product.stock < product.stock_minimo) {
          message =
            message +
            `----- EL producto ${product.name}, esta por debajo del Stock Minimo, actualmente tiene ${product.stock}-----`;
        }
      }
    }
    if (message === '') return;
    await this.telegramService.sendMessages(message);
  }

  private async revisar_stock_minimo() {
    const products = await this.productosService.findAll({
      activo: true,
      limit: 9999,
      offset: 0,
      //is_service:false
    });
    for (const product of products) {
      if (product.is_service) {
        continue;
      } else {
        await this.productosService.check_stock(product.id);
      }
    }
  }
}
