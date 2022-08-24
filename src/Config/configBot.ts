import { BotSettings } from "../Interfaces/IConfigs";
import { ActivityType, Partials } from "discord.js";
import * as dotenv from 'dotenv'
dotenv.config();

      
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
  prefix: ".",
  paths: {
    commands: "src/Commands/admin",
    events: "src/Events",
  },
};