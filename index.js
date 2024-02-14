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
const url = `https://api.notion.com/v1/databases/${databaseId}/query`;

const headers = {
  'Content-Type': 'application/json',
  'Notion-Version': '2022-06-28',
  'Authorization': 'Bearer secret_yRXLwrnuBgXoquzA3L6j7dKMMIfbMSiacqMXdyFQjGV'
};

const filterData = {
  "filter": {
    "property": "キャラ名",
    "title": {
      "equals": "魈"
    }
  }
};

const requestOptions = {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(filterData)
};

fetch(url, requestOptions)
  .then(response => response.json())
  .then(data => {
    // propertiesプロパティを取得
    const properties = data.properties;
    console.log(properties);
  })
  .catch(error => console.error('Error:', error));


client.login(process.env.DISCORD_BOT_TOKEN);
