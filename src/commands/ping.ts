import { Message } from "discord.js";
import { ICommand } from "../utils/interfaces";

const command: ICommand = {
  name: "ping",
  description: "Replies to the user with a pong when invoked.",
  aliases: ["p"],
  syntax: "j!ping",
  async execute(message: Message, _args: string[]) {
    console.log(
      `Command ping started by user ${message.member!.user.tag} in ${
        message.guild!.name
      }.`
    );

    try {
      await message.channel.send("Pong");
      console.log(
        `Command ping, started by user ${
          message.member!.user.tag
        } terminated successfully in guild ${message.guild!.name}.`
      );
    } catch (e) {
      console.log(
        `Failed to send a message in ${
          message.guild!.name
        }. The error message is below:`
      );
      console.log(e);
    }
  },
};

export = command;