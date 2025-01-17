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

  @Cron('* * * * *')
  private async verificar_stock() {
    try {
      this.logger.verbose('Verificando Stock');
      await this.revisar_stock();
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

    for (const product of products) {
      if (product.is_service) {
        continue;
      } else {
        if (product.stock < product.stock_minimo) {
          const message = ` --- EL producto ${product.name} --- Esta por debajo del Stock Minimo, actualmente tiene ${product.stock}`;
          await this.telegramService.sendMessages(message);
        }
      }
    }
  }
}
