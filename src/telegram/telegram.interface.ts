/* eslint-disable prettier/prettier */
import { ModuleMetadata } from '@nestjs/common';
export interface ITelegram {
  chatId: string;
  token: string;
}

export interface ITelegramModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	useFactory: (...args: any[]) => Promise<ITelegram> | ITelegram;
	inject?: any[];
}