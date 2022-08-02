import { Logger } from '../util/Logger';
import { Bot } from '../Client/Client';
import Event from '../Commands/Adapter/Event';
import { Message } from 'discord.js';

export default class MessageCreate extends Event{

    constructor(protected client:Bot){
        super(client)
    }

    async run(message:Message):Promise<void> {
        message.channel.send("test")
    }
}