import { Message } from "discord.js";
import { Bot } from "src/Client/Client";
import Command from "../../Core/Command";

export default class Ban extends Command {

    constructor(client:Bot) {
        super(client, {
            name:"Ban",
            category:"Moderation",
            usage: client.settings.prefix?.concat("Ban"),
            description:"Comando para banir os usuarios da comunidade.",
            cooldown:1000,
            requiredPermissions:["SendMessages"]
        })
    }

    public async run(client: Bot, message: Message, args: string[]): Promise<void> {
        await message.channel.send("Ban command")
    }
}