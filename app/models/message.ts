import AppBaseModel from '#models/app_base_model';
import User from '#models/user';
import { column, hasOne } from '@adonisjs/lucid/orm';
import type { HasOne } from '@adonisjs/lucid/types/relations';

export default class Message extends AppBaseModel {
  @column()
  declare senderId: User['id'];

  @hasOne(() => User, { foreignKey: 'senderId' })
  declare sender: HasOne<typeof User>;

  @column()
  declare targetId: User['id'];

  @hasOne(() => User, { foreignKey: 'targetId' })
  declare target: HasOne<typeof User>;

  @column()
  declare content: string;
}
