import { Bot } from "../../Client/Client";


export default abstract class Event {

    constructor(protected client: Bot){
    }

    public abstract run(...args:any[]):Promise<void>

}