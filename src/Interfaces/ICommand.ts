import Command from "../Commands/Adapter/Command";
import { BaseGuildTextChannel, ChannelType, Client, ClientOptions, Collection, DMChannel, EmbedBuilder, Guild, NewsChannel, PermissionsString, PresenceData, TextBasedChannelMixin, TextChannel, User } from "discord.js";
import { Bot } from "src/Client/Client";

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
        commands:string;
        events:string;
    }
}

export interface CommandOptions {
    name: string;
    description?: string;
    usage?: string;
    category?: string;
    cooldown: number;
    requiredPermissions: PermissionsString[];
}

export interface UserCooldown {
    user: User;
    guild: Guild;
}

export interface BotEvent {
    run(...args: any[]): Promise<unknown>;
}

export type EmbedOrMessage = EmbedBuilder | string;