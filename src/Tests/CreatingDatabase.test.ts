import {
    connectDBForTesting,
    disconnectDBForTesting,
} from "./ConnectingDBForTest";

import {GuildModel} from "../Model/Guild";

import faker from "@faker-js/faker";
import {prop} from "@typegoose/typegoose";

describe("guildModel Testing", () => {
    beforeAll(async () => {
        await connectDBForTesting();
    });
    afterAll(async () => {
        await GuildModel.collection.drop();
        await disconnectDBForTesting();
    });

    test("guildModel Create Test", async () => {

        const doc = new GuildModel({
            guildID: "111111111111",
            ownerGuildID: "2222222222222",
            isAuthorized: true,
            prefix: '.',
            privateChannelID: '33333333333333333333',
            publicChannelID: '4444444444444444444444',
        })

        const createdPerson = await doc.save();

        expect(createdPerson).toBeDefined();
        expect(createdPerson.guildID).toBe(doc.guildID);
        expect(createdPerson.ownerGuildID).toBe(doc.ownerGuildID);
        expect(createdPerson.isAuthorized).toBe(doc.isAuthorized);
        expect(createdPerson.prefix).toBe(doc.prefix);
        expect(createdPerson.privateChannelID).toBe(doc.privateChannelID);
        expect(createdPerson.publicChannelID).toBe(doc.publicChannelID);
    });

    test('guildModel Find Test', async() => {
        const doc = new GuildModel({
            guildID: "111111111111",
            ownerGuildID: "2222222222222",
            isAuthorized: true,
            prefix: '.',
            privateChannelID: '33333333333333333333',
            publicChannelID: '4444444444444444444444',
        })
        await doc.save();

        const findOneGuild = await GuildModel.findOne({guildID: doc.guildID});
        expect(findOneGuild).toBeDefined();
        expect(findOneGuild!.guildID).toBe(doc.guildID)

    })

    test('guildModel Update Test', async () => {
        const doc = new GuildModel({
            guildID: "111111111111",
            ownerGuildID: "2222222222222",
            isAuthorized: true,
            prefix: '.',
            privateChannelID: '33333333333333333333',
            publicChannelID: '4444444444444444444444',
        })
        await doc.save();

        const updatedGuild = await GuildModel.findOneAndUpdate({guildID: doc.guildID}, {isAuthorized:false});
        expect(updatedGuild).toBeDefined();
        expect(updatedGuild!.isAuthorized).toBe(doc.isAuthorized)
    })

    // test('guildModel Delete Test', async () => {
    //     const doc = new GuildModel({
    //         guildID: "111111111111",
    //         ownerGuildID: "2222222222222",
    //         isAuthorized: true,
    //         prefix: '.',
    //         privateChannelID: '33333333333333333333',
    //         publicChannelID: '4444444444444444444444',
    //     })
    //     await doc.save();
    //
    //     const deletedGuild = await GuildModel.findOneAndRemove({guildID: doc.guildID});
    //     const findDeletedGuild = await GuildModel.findOne({guildID: doc.guildID});
    //     expect(findDeletedGuild).toBeNull();
    // })
});