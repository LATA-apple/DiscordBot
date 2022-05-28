const { Client, Intents } = require("discord.js");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log(`${client.user.tag}にログインしました！`)
  console.log(client)
})

client.on('message', message => {
  if (message.mentions.users.has(client.user.id)) {
    message.reply('呼びましたか？')
    return
  }
})

client.login(process.env.DISCORD_BOT_TOKEN)
