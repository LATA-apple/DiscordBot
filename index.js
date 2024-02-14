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


client.on('messageCreate', async message => {
  // Ignore messages from other bots
  if (message.author.bot) return;
  
  // Check if the message is from the specified channel ID
  if (message.channel.id !== '1206824509538308116') return;
  
  const headers = {
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28',
    'Authorization': 'Bearer secret_yRXLwrnuBgXoquzA3L6j7dKMMIfbMSiacqMXdyFQjGV'
  };
  
  const filterData = {
    "filter": {
      "property": "キャラ名",
      "title": {
        "equals": message.content // メッセージの内容をキャラ名として使用
      }
    }
  };
  
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(filterData)
  };
  
  // データの取得と処理
  fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => {
      const properties = data.results[0].properties; // レスポンスのresultsからpropertiesオブジェクトを取得
      Object.keys(properties).forEach(key => {
        const property = properties[key]; // 各プロパティを取得
        console.log(`Key: ${key}`);
        console.log(property); // プロパティの内容を出力
        
        // Valueの値をnameまたはcontentの値、もしくはnullとして取得
        let value = null;
        if (property.name) {
          value = property.name;
        } else if (property.content) {
          value = property.content;
        } else if (property.type === 'multi_select') {
          // multi_selectの場合は各オブジェクトのnameプロパティの値を取得し、カンマで連結する
          const multiSelectValues = property.multi_select.map(item => item.name);
          value = multiSelectValues.join(', ');
        }
        
        // プロパティのキーと値をメッセージに含めて送信
        message.channel.send(`Key: ${key}\nValue: ${value}`);
      });
    })
    .catch(error => console.error('Error:', error));
  
});


client.login(process.env.DISCORD_BOT_TOKEN);
