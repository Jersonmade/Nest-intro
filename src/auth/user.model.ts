/* eslint-disable prettier/prettier */
import { Prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
  @Prop({ unique: true })
  email: string;

  @Prop()
  passwordHash: string;
}
