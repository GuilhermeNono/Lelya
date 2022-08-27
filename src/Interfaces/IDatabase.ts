export interface IGuildSchema {
    isAuthorized?: boolean;
    prefix?: string;
    privateChannelID?: string;
    publicChannelID?: string;
}

export interface IProfileSchema{
    name: string;
    roles?: string[];
}

export interface IUserSchema{
    userId: string;
    botSupervisor: boolean;
}