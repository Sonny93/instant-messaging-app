import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'messages';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.string('content', 4000).notNullable();
      table.integer('target_id').notNullable();
      table.integer('sender_id').notNullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
