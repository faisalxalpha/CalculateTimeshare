
import { type Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('app_settings')
    .addColumn('key', 'text', (col) => col.primaryKey())
    .addColumn('value', 'text')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('app_settings').execute();
}
