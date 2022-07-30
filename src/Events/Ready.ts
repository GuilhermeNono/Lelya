
import { Bot } from '../Client/Client';
import { Logger } from '../util/Logger';
import {BotEvent} from '../Interfaces/ICommand'

export default class Ready implements BotEvent{

    constructor(private client:Bot){}

    public async run():Promise<void> {
        if(this.client.user) {
            Logger.info(`${this.client.user.username} 's Online!✨.`)
            this.client.user.setPresence(this.client.settings.presence);
        }
    }
}