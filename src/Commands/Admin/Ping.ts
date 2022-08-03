import { Bot } from "../../Client/Client";
import { Message } from "discord.js";
import Command from "../../Core/Command";
import { GuildModel } from "../../Model/Guild";


export default class Ping extends Command {

    constructor(client: Bot) {
        super(client, {
            name: 'ping',
            cooldown: 1000,
            requiredPermissions: ["SendMessages"],
            category: "Information",
            usage: client.settings.prefix?.concat('ping'),
            description: "Espera o 'pong' como retorno do bot."
        });
    }

    public async run(client: Bot, message: Message<boolean>, args: string[]): Promise<void> {
        await message.channel.send("Pong");
        // const doc = new GuildModel({
        //     guildID: message.guildId,
        //     ownerGuildID: message.guild?.ownerId,
        //     isAuthorized: true,
        //     prefix: ".",
        //     privateChannelID: "895804389632131083",
        //     publicChannelID: "895804389632131083"
        // })

        // doc.save().then(() => message.react('💚'));
    }
}