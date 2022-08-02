
import { Bot } from '../Client/Client';
import { Logger } from '../util/Logger';
import Event from '../Commands/Adapter/Event';

export default class Ready extends Event{

    constructor(protected client:Bot){
        super(client)
    }

    public async run():Promise<void> {
        if(this.client.user) {
            Logger.info(`${this.client.user.username} 's Online!✨.`)
            this.client.user.setPresence(this.client.settings.presence);
        }
    }
}