import { Db, ObjectId} from 'mongodb'
import { MigrationInterface } from 'mongo-migrate-ts';
import {prop} from "@typegoose/typegoose";

export class populateCollections1661613828858 implements MigrationInterface {
  public async up(db: Db): Promise<any> {

    try {
      const guildCollection = await db.collection("guilds")
      const profileCollection = await db.collection("profiles")
      const userCollection = await db.collection("users")
      const guildUserCollection = await db.collection("guildusers")
      const punishmentCollection = await db.collection("punishments")
      const punishmentGuildUserCollection = await db.collection("punishmentguildusers")

      await guildCollection.insertOne({
          _id: new ObjectId("2fd89b6098d42980bea8a323"),
          guildID: "466405222877495299",
          ownerGuildID: "261945904829956097",
          isAuthorized: true,
          prefix: ".",
          privateChannelID: "776094611470942208",
          publicChannelID: "776094611470942208"
      })

      await profileCollection.insertOne({
          name: "ADMIN",
          roles: [],
          guildid: "2fd89b6098d42980bea8a323",
      })

      await userCollection.insertOne({
          _id: new ObjectId("840591c3482a5d1b9a755468"),
          userId: "261945904829956097",
          botSupervisor: true,
      })

      await punishmentCollection.insertOne({
          _id: new ObjectId("3ae14a28e0649fa054f21375"),
          type: "Test",
          reason: "Testing",
          whoPunished: "261945904829956097",
          forHowLong: "5m"
      })

      await punishmentGuildUserCollection.insertOne({
        _id: new ObjectId("a75eefa27c6ea5303b8c4fc4"),
        guildId: "2fd89b6098d42980bea8a323",
        userId: "840591c3482a5d1b9a755468",
        punishmentId: "3ae14a28e0649fa054f21375"
      })

      await guildUserCollection.insertOne({
          banned: false,
          muted: false,
          countMute: 0,
          countBan: 0,
          countKick: 0,
          guildId: "2fd89b6098d42980bea8a323",
          userId: "840591c3482a5d1b9a755468",
          punishmentGuildUserId: ["a75eefa27c6ea5303b8c4fc4"]
      })

    } catch (e) {
      console.log(e)
    }

  }

  public async down(db: Db): Promise<any> {
  }
}
