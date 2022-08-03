import { Logger } from "../util/Logger";
import { Bot } from "../Client/Client";
import Event from "../Core/Event";
import { Message } from "discord.js";
import { GuildModel } from "../Model/Guild";
import { BotSettings } from "src/Interfaces/IConfigs";

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
            this.client.settings.prefix = prefix;
          }
      
          const command = args.shift()!.slice(this.client.settings.prefix.length);

          if(!message.content.startsWith(this.client.settings.prefix)) return 
      
          const commandOnClient = this.client.commands.get(command);
      
          if (!commandOnClient) return;
          if (!commandOnClient.canRun(message.author, message)) return;
      
          this.isAuthorizedGuild(message, async () => {
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

      //TODO: Create a class for creating a new Table in database
      if (!guildDB) return;

      if (guildDB.isAuthorized){
        callback();
      } else {
        message.channel.send("🚫 Servidor SEM AUTORIZAÇÃO. Por favor, entre em contato com os desenvolvedores para mais informações. 🚫")
      }
  }

  private async getPrefix(message:Message): Promise<string> {
    const guildDB = await GuildModel.findOne({
        guildID: message.guildId,
      }).exec();
      
      if (!guildDB) throw 'Banco de dados Inexistente, logo não é possivel adquirir o prefix para comandos.';

      return guildDB.prefix
 
  }
}
