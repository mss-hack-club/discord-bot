import { Channel, GuildMember, Message, Role } from "discord.js";

export function getRoleFromMention(
  message: Message,
  mention: string
): Role | undefined {
  if (mention.startsWith("<@") && mention.endsWith(">")) {
    mention = mention.slice(2, -1);

    if (mention.startsWith("&")) {
      mention = mention.slice(1);
    }

    return message.guild!.roles.cache.get(mention);
  }
}

export function getUserFromMention(
  message: Message,
  mention: string
): GuildMember | undefined {
  if (mention.startsWith("<@") && mention.endsWith(">")) {
    mention = mention.slice(2, -1);

    if (mention.startsWith("!")) {
      mention = mention.slice(1);
    }

    return message.guild!.members.cache.get(mention);
  }
}

export function getChannelFromMention(
  message: Message,
  mention: string
): Channel | undefined {
  if (!mention) return;

  if (mention.startsWith("<#") && mention.endsWith(">")) {
    mention = mention.slice(2, -1);

    return message.guild!.channels.cache.get(mention);
  }
}
