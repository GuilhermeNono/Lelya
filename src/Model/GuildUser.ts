import {getModelForClass, prop, Ref} from "@typegoose/typegoose";
import {Guild} from "./Guild";
import {User} from "./User";
import {LastPunishment} from "./LastPunishment";

export class GuildUser {
    @prop({required: true, default: false})
    public banned!: boolean;
    @prop({required:true, default: false})
    public muted!:boolean;
    @prop({required:true, default: 0})
    public countMute!: number;
    @prop({required:true, default: 0})
    public countBan!: number;
    @prop({required:true, default: 0})
    public countKick!: number;

    @prop({ref:() => Guild, required:true})
    public guildId!:Ref<Guild>;
    @prop({ref:() => User, required:true})
    public userId!: Ref<User>;
    @prop({ref:()=> LastPunishment, required:true})
    public lastPunishmentId!: Ref<LastPunishment>
}

export const GuildUserModel = getModelForClass(GuildUser)