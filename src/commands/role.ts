import { Message, Role } from "discord.js";
import { getUserFromMention } from "../utils/helpers";
import { ICommand } from "../utils/interfaces";

const command: ICommand = {
  name: "role",
  description: "Create and assign a role to a given user.",
  aliases: ["r", "rl"],
  syntax: "j!role [role name] [user mention]",
  async execute(message: Message<boolean>, args?: string[]) {
    console.log(
      `Command role started by user ${message.member!.user.tag} in ${
        message.guild!.name
      }.`
    );

    if (args?.length != 2) {
      // first check if the number of arguments is correct
      try {
        console.log(
          "Incorrect number of arguments supplied. Stopping execution."
        );
        await message.channel.send(
          `Invalid syntax! Correct syntax: ${this.syntax}`
        );
        return;
      } catch (e) {
        console.log(
          `Failed to send a message in ${
            message.guild!.name
          }. The error message is below:`
        );
        console.log(e);
      }
    }

    const roleName = args?.shift(); // get the role name

    // if this role name exists
    // get the servers roles, search them for a role with this current name
    const roleCache = message.guild?.roles.cache; // get the role cache

    const role = roleCache?.find((r) => r.name === roleName);

    if (role) {
      // first check if the number of arguments is correct
      try {
        console.log("Role already exists in this server. Stopping execution.");
        await message.channel.send(`Role already exists on this server.`);
        return;
      } catch (e) {
        console.log(
          `Failed to send a message in ${
            message.guild!.name
          }. The error message is below:`
        );
        console.log(e);
      }
    }

    const userMention = args?.shift();

    const user = getUserFromMention(message, userMention!); // get the user

    if (!user) {
      // first check if the number of arguments is correct
      try {
        console.log("User doesn't exist in this server. Stopping execution.");
        await message.channel.send(`Invalid user.`);
        return;
      } catch (e) {
        console.log(
          `Failed to send a message in ${
            message.guild!.name
          }. The error message is below:`
        );
        console.log(e);
      }
    }

    // create the role

    let newRole: Role | undefined;

    try {
      newRole = await message.guild?.roles.create({
        name: roleName,
      });
      console.log(
        `Role ${newRole!.name} created successfully in guild ${message.guild}`
      );
    } catch (e) {
      console.log(
        `Failed to send a message in ${
          message.guild!.name
        }. The error message is below:`
      );
      console.log(e);
    }

    if (newRole) {
      // if the new role exists
      try {
        await user?.roles.add(newRole); // try to add the role to the user
        console.log(
          `Role ${newRole!.name} successfully added to member ${
            user?.user.tag
          } in guild ${message.guild}.`
        );
        console.log(
          `Command role, started by user ${
            message.member!.user.tag
          } terminated successfully in guild ${message.guild!.name}.`
        );
      } catch (e) {
        console.log(
          `Failed to add a role in ${
            message.guild!.name
          }. The error message is below:`
        );
        console.log(e);
      }
    } else {
      try {
        console.log(
          "Role could not be created successfully. Stopping execution."
        );
        await message.channel.send(`Role could not be created successfully`);
        return;
      } catch (e) {
        console.log(
          `Failed to send a message in ${
            message.guild!.name
          }. The error message is below:`
        );
        console.log(e);
      }
    }
  },
};

export = command;
