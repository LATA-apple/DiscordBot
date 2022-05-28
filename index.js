const { Client, Intents } = require("discord.js");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log(`==== Logged in: ${client.user.tag} ====`);
});

client.on("messageCreate", (message) => {
  console.log(`▶ [${message.author.tag}] ${message.content}`);
  if (message.mentions.users.has(client.user.id)) {
    message.reply("Hi!");
    return;
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
