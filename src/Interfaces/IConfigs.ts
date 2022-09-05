import { Client, ClientOptions, Collection, EmbedBuilder, Guild, PermissionsString, PresenceData, User } from "discord.js";
import Command from "../Core/Command";

export interface BotClient extends Client {
    settings: BotSettings;
    commands: Collection<string, Command>;
}

export interface BotSettings {
    presence: PresenceData;
    clientOptions: ClientOptions;
    token?: string;
    prefix: string;
    paths: {
        commands:string[];
        events:string;
    }
}

export interface DBSettings {
    MongoURI: string;
}

export interface CommandOptions {
    name: string;
    description?: string;
    usage?: string;
    category?: string;
    cooldown: number;
    requiredPermissions: PermissionsString[];
    onlyMaster?: boolean;
    //requiredRole: RolesLevelAlias[] | string[];
}

export interface UserCooldown {
    user: User;
    guild: Guild;
}

export interface BotEvent {
    run(...args: any[]): Promise<void>;
}

export type EmbedOrMessage = EmbedBuilder | string;