import {getModelForClass, prop} from "@typegoose/typegoose";

export class User {
    @prop({required:true})
    public userID!:string;
    @prop({default: false, required:true})
    public botSupervisor?: boolean;
}

export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true }});