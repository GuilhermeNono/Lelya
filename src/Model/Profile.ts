import {getModelForClass, prop, Ref, Severity} from "@typegoose/typegoose";
import {Guild} from "./Guild";

class Profile {
    @prop({required:true})
    public name!:string;
    @prop({default: [], allowMixed:Severity.ALLOW})
    public roles?: string[];

    @prop({ref: () => Guild, required:true})
    public guild__id!: Ref<Guild>
}

export const ProfileModel = getModelForClass(Profile)