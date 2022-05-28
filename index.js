// Response for Uptime Robot
const http = require("http");
const { Client, Intents } = require("discord.js");

http
  .createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Discord bot is active now \n");
  })
  .listen(3000);

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
