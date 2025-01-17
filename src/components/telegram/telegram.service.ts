import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { envs } from 'src/config';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger('TELEGRAM');

  private async sendMessage(numero: string, body: string) {
    const { TOKEN_TELEGRAM_MESSAGE, URL_TELEGRAM_MESSAGE } = envs;
    const url = `${URL_TELEGRAM_MESSAGE}/api/telegram/send_message?numero=${numero}&body=${body}&token=${TOKEN_TELEGRAM_MESSAGE}`;
    try {
      this.logger.debug(`Enviando Mensaje => ${numero}`);
      await axios.get(url);
    } catch (e) {
      this.logger.error(
        `NO SE ENVIO LA NOTIFICACION ERROR =>${e?.message} URL => ${url}`,
      );
    }
  }

  public async sendMessages(body: string) {
    const { TELEFONO_TELEGRAM } = envs;
    for (const telefono of TELEFONO_TELEGRAM) {
      const newMessage = `\n\nPOCO STOCK\n\n${body}`;
      await this.sendMessage(telefono, newMessage);
    }
  }
}
