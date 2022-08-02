import { BotSettings } from "../Interfaces/ICommand";
import { ActivityType, Partials } from "discord.js";

export const settings: BotSettings = {
  presence: {
    status: "idle",
    activities: [{ name: "You 👀", type: ActivityType.Watching }],
    afk: true,
  },
  clientOptions: {
    intents: [
      "GuildMessages",
      "MessageContent",
      "Guilds",
      "GuildPresences",
      "GuildMembers",
    ],
    partials: [Partials.User, Partials.Message, Partials.GuildMember],
  },
  //TODO: Deixar o 'prefix' conectado com o banco de dados
  prefix: ".",
  paths: {
    commands: "src/Commands/admin",
    events: "src/Events",
  },
};