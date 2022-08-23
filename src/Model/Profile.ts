import {getModelForClass, prop, Ref} from "@typegoose/typegoose";
import {Guild} from "./Guild";

class Profile {
    @prop({required:true})
    public name!:string;
    @prop({default: []})
    public roles?: string[];

    @prop({ref: () => Guild, required:true})
    public guild__id!: Ref<Guild, string>
}

export const ProfileModel = getModelForClass(Profile)