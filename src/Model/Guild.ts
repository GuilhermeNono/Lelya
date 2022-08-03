import { getModelForClass, prop } from "@typegoose/typegoose";

class Guild {
    @prop()
    public guildID!: string;
    @prop()
    public ownerGuildID!: string;
    @prop()
    public isAuthorized!:boolean;
    @prop()
    public prefix!: string;
    @prop()
    public privateChannelID!:string;
    @prop()
    public publicChannelID!: string;
}

export const GuildModel = getModelForClass(Guild);