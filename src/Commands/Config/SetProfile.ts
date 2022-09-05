import { Bot } from "../../Client/Client";
import { Message } from "discord.js";
import Command from "../../Core/Command";
import DatabaseCreator from "../../util/DatabaseCreator";


export default class SetProfile extends Command {

    constructor(client: Bot) {
        super(client, {
            name: 'SetProfile',
            cooldown: 1000,
            requiredPermissions: ["SendMessages"],
            category: "Information",
            usage: client.settings.prefix?.concat('Ping'),
            description: "Espera o 'pong' como retorno do bot.",
            onlyMaster: true
        });
    }

    public async run(client: Bot, message: Message, args: string[]): Promise<void> {

        // await new DatabaseCreator(message).profileSchema({name:"MODERATION", roles:["595008072951267328"]});

    }
}