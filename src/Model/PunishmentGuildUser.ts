import {getModelForClass, prop, Ref} from "@typegoose/typegoose";
import {Punishment} from "./Punishment";
import {Guild} from "./Guild";
import {User} from "./User";

export class PunishmentGuildUser {
    @prop({ref:()=> Punishment})
    public punishmentId!: Ref<Punishment>
    @prop({ref:()=> Guild})
    public guildId!: Ref<Guild>
    @prop({ref:()=> User})
    public userId!: Ref<User>
}

export const PunishmentGuildUserModel = getModelForClass(PunishmentGuildUser, { schemaOptions: { timestamps: true } })