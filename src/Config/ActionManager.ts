import { Bot } from "../Client/Client";
import Command from "../Core/Command";
import { Logger } from "../util/Logger";
import { Collection } from "discord.js";
import "reflect-metadata";
import { readdir, statSync } from "fs";
import { join } from "path";
import { Service } from "typedi";
import Event from "../Core/Event";
import { Settings } from "./configDB"
import { connect } from "mongoose";
import { DBSettings } from "src/Interfaces/IConfigs";


@Service()
export class ActionManager {

  private dbSettings: DBSettings = Settings;

  public commands: Collection<string, Command> = new Collection<
    string,
    Command
  >();

  public events: Collection<string, Event> = new Collection<string, Event>();

  public InitializeCommands(client: Bot): void {
    Logger.warn("⌛ Initializing Commands...⌛");
    const { commands } = client.settings.paths;

    readdir(commands, (err, files) => {
      if (err) Logger.error(err);

      files.forEach((file, i) => {
        try {
          if (statSync(join(commands, file)).isDirectory()) {
            this.InitializeCommands(client);
          } else {
            const Command: any = require(join(
              __dirname,
              "../../",
              `${commands}/${file}`
            )).default;

            const command = new Command(client);

            this.commands.set(command.conf.name, command);
          }
        } catch (error) {
          return Logger.error(
            `❌ LOADING FAILURE - Failed to load folder "${commands}" in file "${file}". ❌ -> ${error}`
          );
        }
      });
    });
    Logger.info("Commands loaded without any error. ✔");
  }

  public InitializeEvents(client: Bot): void {
    Logger.warn("⌛ Initializing Events...⌛");

    const { events } = client.settings.paths;

    readdir(events, (err, files) => {
      if (err) Logger.error(err);

      files.forEach((file) => {
        try {
          if (statSync(join(events, file)).isDirectory()) {
            this.InitializeCommands(client);
          } else {
            const Event: any = require(join(
              __dirname,
              "../../",
              `${events}/${file}`
            )).default;

            const event = new Event(client);
            const eventName = event.constructor.name;

            this.events.set(eventName, event);
            client.on(
              eventName.charAt(0).toLowerCase() + eventName.slice(1),
              (...args: any[]) => event.run(...args)
            );
          }
        } catch (error) {
          return Logger.error(
            `❌ LOADING FAILURE - Failed to load folder "${events}" in file "${file}". ❌ -> ${error}`
          );
        }
      });
    });
    Logger.info("Events loaded without any error. ✔");
  }

  public InitializeDatabase(): void { 
    Logger.warn("⌛ Initializing Database connection...⌛")
    connect(`${this.dbSettings.MongoURI}`).then(() => Logger.info("Database Connected. ✔")).catch(err => {
      Logger.error("❌ Connection Failed -> " + err);
      throw err
    });
  }
}
