import { Bot } from "../../Client/Client";
import { Message } from "discord.js";
import Command from "../../Core/Command";
import {GuildUserModel} from "../../Model/GuildUser";


export default class Ping extends Command {

    constructor(client: Bot) {
        super(client, {
            name: 'ping',
            cooldown: 1000,
            requiredPermissions: ["SendMessages"],
            category: "Information",
            usage: client.settings.prefix?.concat('Ping'),
            description: "Espera o 'pong' como retorno do bot."
        });
    }

    public async run(client: Bot, message: Message, args: string[]): Promise<void> {
        await message.channel.send("Pong");
    }
}