import {getModelForClass, prop} from "@typegoose/typegoose";

export class Punishment {
    @prop({required:true})
    public type!:string;
    @prop()
    public reason?: string;
    @prop({required:true})
    public whoPunished!: string;
    @prop()
    public forHowLong?: string;
}

export const PunishmentModel = getModelForClass(Punishment, { schemaOptions: { timestamps: true } })