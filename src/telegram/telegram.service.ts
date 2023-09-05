import { Inject, Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ITelegram } from './telegram.interface';

@Injectable()
export class TelegramService {
  bot: Telegraf;
  options: ITelegram;

  constructor(@Inject('TELEGRAM_MODULE_OPTIONS') options: ITelegram) {
    this.bot = new Telegraf(options.token);
    this.options = options;
  }

  async sendMessage(message: string, chatId: string = this.options.chatId) {
    await this.bot.telegram.sendMessage(chatId, message);
  }
}
