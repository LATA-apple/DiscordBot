const { Client, Intents } = require("discord.js");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log(`${client.user.tag}でログインしました！`);
});

client.on("messageCreate", (message) => {
  if (message.mentions.users.has(client.user.id)) {
    message.reply("呼びましたか？");
    return;
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);

if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.error("tokenが設定されていません！");
  process.exit(0);
}
