import Discord from "discord.js";
import * as dotenv from "dotenv";

dotenv.config();

const prefix = "j!";

const client: Discord.Client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_BANS,
    Discord.Intents.FLAGS.GUILD_INVITES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user!.tag}!`);
});

client.on("message", async (message: Discord.Message) => {
  if (
    !message.content.toLowerCase().startsWith(prefix) ||
    message.author.bot ||
    message.guild === null
  ) {
    return;
  }

  if (!message.member) {
    return;
  }

  if (message.content.includes("ping")) {
    message.channel.send("Pong");
  }
});


(async () => {
  try {
    await client.login(process.env.BOT_TOKEN);
  } catch (error) {
    console.log("Failed to log in as Discord bot. Below is the error:");
    console.log(error);
  }
})();