import { Message } from 'discord.js';
import { Bot } from 'src/Client/Client';
import {BotEvent} from '../Interfaces/ICommand'

class MessageCreate implements BotEvent{
    constructor(private client:Bot){}
    public async run(args: any[]): Promise<unknown> {
        return
    }
}
