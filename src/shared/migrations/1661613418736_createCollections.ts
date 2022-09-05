import { Db } from 'mongodb'
import { MigrationInterface } from 'mongo-migrate-ts';

export class createCollections1661613418736 implements MigrationInterface {
  public async up(db: Db): Promise<any> {
    try {

      await db.createCollection("guilds")
      await db.createCollection("profiles")
      await db.createCollection("users")
      await db.createCollection("guildusers")
      await db.createCollection("punishments")
      await db.createCollection("punishmentguildusers")

    } catch (e) {
      console.log(e)
    }
  }

  public async down(db: Db): Promise<any> {
  }
}
