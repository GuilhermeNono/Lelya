
import { BotClient, BotSettings } from '../Interfaces/ICommand';
import EndsWithAny from '../lib/functions/endsWithAny';
import {Collection, Client  as DiscordClient} from 'discord.js'
import { readdirSync } from 'fs';
import path from 'path';
import 'reflect-metadata'
import { Service } from 'typedi';
import { settings } from '../Config/configBot';
import dotenv from 'dotenv';
import { ActionManager } from '../Config/ActionManager';
import { Logger } from '../util/Logger';
import Command from '../Commands/Adapter/Command';

dotenv.config();

@Service()
export class Bot extends DiscordClient implements BotClient{

    public settings:BotSettings;

    constructor(private actionManager: ActionManager) {
        super({intents:'GuildMessages'})
        this.settings = settings;
        this.settings.token = process.env["DISCORD_TOKEN"]
        this.init();
    }


    public async init():Promise<void> {
        try {
            this.actionManager.InitializeCommands(this);
            this.actionManager.InitializeEvents(this);
            Logger.warn(`Authenticating token...🛠️`)
            await this.login(this.settings.token);
            Logger.info(`Token Authenticated!🗝️`)
        } catch (error) {
            Logger.error(`Não foi possivel iniciar o bot: ${error}`)
        }
            
    }

    public get commands():Collection<string, Command> {
        return this.actionManager.commands
    }
}