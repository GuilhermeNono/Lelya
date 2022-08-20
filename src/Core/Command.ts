import { Bot } from "../Client/Client";
import { CommandOptions, EmbedOrMessage, UserCooldown } from "../Interfaces/IConfigs";
import { Guild, Message, TextBasedChannel, User} from "discord.js";


export default abstract class Command {

    public conf: CommandOptions;
    public cooldowns:Set<UserCooldown>

    protected constructor(protected client: Bot, options: CommandOptions){
        //TODO:Add alliases commands
        this.conf = {
            name:options.name,
            cooldown: options.cooldown,
            description:options.description,
            usage:options.usage,
            requiredPermissions: options.requiredPermissions,
            category: options.category
        }

        this.cooldowns = new Set();
    }

    public abstract run(client:Bot ,message:Message, args:string[]):Promise<void>

    public canRun(user: User, message:Message):boolean {

        const onCooldown = [...this.cooldowns].filter((cd) => cd.user === user && cd.guild === message.guild).length > 0;

        const hasPermission = message.member ? message.member.permissions.has(this.conf.requiredPermissions, true) : false

        if(!hasPermission || onCooldown) {
            message.channel.send('Você não tem permissão para utilizar esse comando')

            return false
        }

        return true;
    }

    public setCooldown(user:User, guild:Guild):void {
        this.cooldowns.add({user, guild});

        setTimeout(() => {
            const cooldown = [...this.cooldowns].filter(
                (cd) => cd.user === user && cd.guild === guild
            )[0];

            this.cooldowns.delete(cooldown);
            
        }, this.conf.cooldown);
    }
}