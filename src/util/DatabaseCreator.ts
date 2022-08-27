import { Message } from "discord.js";
import {IGuildSchema, IProfileSchema, IUserSchema} from "../Interfaces/IDatabase";
import { GuildModel } from "../Model/Guild";
import { Logger } from "./Logger";
import {ProfileModel} from "../Model/Profile";
import {UserModel} from "../Model/User";

export default class DatabaseCreator{
  private message: Message;

  constructor(message: Message) {
    this.message = message;
  }

  public async guildSchema(GuildSchemaOptions?:IGuildSchema): Promise<boolean> {

    try {
    const getOwnerId = await this.getOwnerGuildId();
    const getGuildId = await this.getGuildId();

    if(!getGuildId || !getOwnerId) return false

    const doc = new GuildModel({
      guildID: getGuildId,
      ownerGuildID: getOwnerId,
      isAuthorized: GuildSchemaOptions?.isAuthorized ? GuildSchemaOptions?.isAuthorized : false,
      prefix: GuildSchemaOptions?.prefix ? GuildSchemaOptions?.prefix : ".",
      privateChannelID: GuildSchemaOptions?.privateChannelID ? GuildSchemaOptions?.privateChannelID : "000",
      publicChannelID: GuildSchemaOptions?.publicChannelID ? GuildSchemaOptions?.publicChannelID : "000",
    });

      await doc.save();
      return true;
    } catch (error) {
      Logger.error(`Erro ao criar o GuildSchema -> ${error}`);
      return false;
    }
  }

  private async getOwnerGuildId():Promise<boolean | string> {
    try {
        if(!this.message.guild?.ownerId) throw "OwnerId inexistente"
        return this.message.guild?.ownerId
    } catch (error) {
        Logger.error(`Erro ao buscar o OwnerId -> ${error}`)
        return false
    }
  }

  private async getGuildId(): Promise<boolean | string> {
    try {
        if(!this.message.guildId) throw "GuildId inexistente"
        return this.message.guildId
    } catch (error) {
        Logger.error(`Erro ao buscar o GuildId -> ${error}`)
        return false
    }
  }

  public async profileSchema(ProfileSchemaOptions: IProfileSchema):Promise<boolean> {
    try {
      const doc = new ProfileModel({
        name: ProfileSchemaOptions.name,
        roles: ProfileSchemaOptions.roles ? ProfileSchemaOptions.roles : []
      });

      await doc.save();
      return true;
    } catch (error) {
      Logger.error(`Erro ao criar o GuildSchema -> ${error}`);
      return false;
    }
  }

  public async userSchema(ProfileSchemaOptions: IUserSchema):Promise<boolean> {
    try {
      const doc = new UserModel({
        userId: ProfileSchemaOptions.userId,
        botSupervisor: ProfileSchemaOptions.botSupervisor
      });

      await doc.save();
      return true;
    } catch (error) {
      Logger.error(`Erro ao criar o UserSchema -> ${error}`);
      return false;
    }
  }

}
