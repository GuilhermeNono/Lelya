import { Logger } from "../util/Logger";
import { Bot } from "../Client/Client";
import Event from "../Core/Event";
import { Message } from "discord.js";
import { GuildModel } from "../Model/Guild";
import { BotSettings } from "../Interfaces/IConfigs";
import DatabaseCreator from "../util/DatabaseCreator";
import {User, UserModel} from "../Model/User";

export default class MessageCreate extends Event {

    private settings: BotSettings;

  constructor(protected client: Bot) {
    super(client);
    this.settings = client.settings
  }

  public async run(message: Message): Promise<void> {
    try {
        if (
            process.env.NODE_ENV === "development" &&
            message.author.id !== "261945904829956097"
          )
            return;
          if (message.author.bot) return;
      
          const args = message.content.split(/\s+/g);

          const prefix = await this.getPrefix(message);

          if(prefix !== this.client.settings.prefix) {
            if(!prefix) return
            this.client.settings.prefix = prefix;
          }
      
          const command = args.shift()!.slice(this.client.settings.prefix.length).toLowerCase();

          if(!message.content.startsWith(this.client.settings.prefix)) return 
      
          const commandOnClient = this.client.commands.get(command);

          if (!commandOnClient) return;
          if (!commandOnClient.canRun(message.author, message)) return;

          const masterPermission = await this.userHaveMasterPermission(message);

          await this.isAuthorizedGuild(message, async () => {
            if(commandOnClient.conf.onlyMaster && !masterPermission) return console.log("123321");
            await commandOnClient.run(this.client, message, args);
            if (message.guild)
              commandOnClient.setCooldown(message.author, message.guild);
          })

    } catch (error) {
        throw `A error occurred during the MessageCreate Event -> ${error}`
    }
  }

  private async isAuthorizedGuild(message:Message, callback:() => void): Promise<void> {
    const guildDB = await GuildModel.findOne({
        guildID: message.guildId,
      }).exec();

      if (!guildDB) {
        const databaseCreator = new DatabaseCreator(message);
        if(!(await databaseCreator.guildSchema())) return
      };

      if (guildDB!.isAuthorized){
        callback();
      } else {
        message.channel.send("🚫 Servidor SEM AUTORIZAÇÃO. Por favor, entre em contato com os desenvolvedores para mais informações. 🚫")
      }
  }

  private async userHaveMasterPermission(message:Message): Promise<boolean> {

    const userDB = await UserModel.findOne({
      userId: message.author.id,
    });

    if (!userDB) {
      const databaseCreator = new DatabaseCreator(message);
      const userSchema = await databaseCreator.userSchema({userId:message.author.id, botSupervisor:false});
      if(!userSchema) return false;
    }

    if (userDB!.botSupervisor){
      return true
    } else {
      return false
    }

  }

  private async getPrefix(message:Message): Promise<string | undefined> {
    const guildDB = await GuildModel.findOne({
        guildID: message.guildId,
      }).exec();
      
      if (!guildDB) {

        const databaseCreator = new DatabaseCreator(message);
        
        if(!(await databaseCreator.guildSchema())) return
        message.channel.send("🚫 Servidor SEM AUTORIZAÇÃO. Por favor, entre em contato com os desenvolvedores para mais informações. 🚫")
      } else {
        return guildDB!.prefix
      }
 
  }
}
