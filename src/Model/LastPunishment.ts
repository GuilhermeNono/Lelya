import {getModelForClass, prop} from "@typegoose/typegoose";

export class LastPunishment {
    @prop({required:true})
    public type!:string;
    @prop()
    public reason?: string;
}

export const LastPunishmentModel = getModelForClass(LastPunishment, { schemaOptions: { timestamps: true } })