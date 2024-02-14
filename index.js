const { Client, Intents } = require("discord.js");
const { createWorker } = require('tesseract.js');
const fetch = require('node-fetch');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log(`==== Logged in: ${client.user.tag} ====`);
  console.log('Bot is ready!');
  client.user.setPresence({ activity: { name: "げーむ" } });
});

const databaseId = '9403ad41aa344441951044a6656d0d9a';
const url = `https://api.notion.com/v1/pages/${databaseId}`;

const headers = {
  'Content-Type': 'application/json',
  'Notion-Version': '2021-05-13',
  'Authorization': 'Bearer secret_yRXLwrnuBgXoquzA3L6j7dKMMIfbMSiacqMXdyFQjGV'
};

fetch(url, {
  method: 'GET',
  headers: headers
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));


client.login(process.env.DISCORD_BOT_TOKEN);
