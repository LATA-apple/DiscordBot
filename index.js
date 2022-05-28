const http = require("http");
const { Client, Intents } = require("discord.js");

const server = http.createServer();
server.on("request", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Bot available.");
});
server.listen(process.env.PORT); //=> mapped to 80

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log(`==== Logged in: ${client.user.tag} ====`);
});

client.on("messageCreate", (message) => {
  if (message.mentions.users.has(client.user.id)) {
    message.reply("呼びましたか？");
    return;
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
