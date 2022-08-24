import {RolesLevelAlias} from "../Types/RolesLevelAlias";

export interface IGuildSchema {
    isAuthorized?: boolean;
    prefix?: string;
    privateChannelID?: string;
    publicChannelID?: string;
}

export interface IProfileSchema{
    name: RolesLevelAlias;
    roles?: string[];
}