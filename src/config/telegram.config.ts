/* eslint-disable prettier/prettier */

import { ConfigService } from '@nestjs/config';
import { ITelegram } from 'src/telegram/telegram.interface';

export const getTGConfig = (configService: ConfigService): ITelegram => {
  const token = configService.get('TELEGRAM_TOKEN');
  if (!token) {
	throw new Error('tg token is not declared');
  }
  return {
    token,
    chatId: configService.get('CHAT_ID') ?? '',
  };
};
