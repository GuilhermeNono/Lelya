import {getModelForClass, prop} from "@typegoose/typegoose";

export class User {
    @prop({default: false, required:true})
    public botSupervisor?: boolean;
    @prop({required:true})
    public userId!:string
}

export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true }});