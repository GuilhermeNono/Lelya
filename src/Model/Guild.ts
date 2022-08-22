import { getModelForClass, prop } from "@typegoose/typegoose";

class Guild {
    @prop({required:true})
    public guildID!: string;
    @prop({required:true})
    public ownerGuildID!: string;
    @prop({required:true})
    public isAuthorized!:boolean;
    @prop({required:true})
    public prefix!: string;
    @prop({required:true})
    public privateChannelID!:string;
    @prop({required:true})
    public publicChannelID!: string;
}

export const GuildModel = getModelForClass(Guild);