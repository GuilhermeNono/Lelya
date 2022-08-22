import {getModelForClass, prop, Ref} from "@typegoose/typegoose";

class Profile {
    @prop({required:true})
    public name!:string;
    @prop()
    public roles?: string[];
}

export const ProfileModel = getModelForClass(Profile)