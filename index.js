const { Client, Intents, MessageEmbed } = require("discord.js");
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
  if (message.channel.id !== '1198496932654501958' && message.channel.id !== '1206824509538308116') return;
  
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
  
  const notionurl = ''
  
  const fields = [];
  console.log(`--------------------------------------------------`);
  
  // データの取得と処理
  fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => {
    const properties = data.results[0].properties;
    const notionurl = data.results[0].public_url;
    
    const embed = new MessageEmbed()
    .setTitle(message.content)
    .setColor('RANDOM')
    .setURL(notionurl)
    
      Object.keys(properties).forEach(key => {
        const property = properties[key]; // 各プロパティを取得
        console.log(`Key: ${key}`);
        console.log(property); // プロパティの内容を出力
        
        // Valueの値を取得し、空行を削除
        let value = null;
        if (property.name) {
          value = property.name.trim();
        } else if (property.content) {
            value = property.content.trim();
        } else if (property.type === 'multi_select') {
            // multi_selectの場合は各オブジェクトのnameプロパティの値を取得し、カンマで連結して空行を削除
            const multiSelectValues = property.multi_select.map(item => item.name.trim());
            value = multiSelectValues.join(', ');
        } else if (property.type === 'select') {
            // selectの場合はnameプロパティの値を取得
            value = property.select.name.trim();
        } else if (property.type === 'rich_text') {
            // rich_textの場合は、plain_textプロパティの値を取得して連結
            const plainTextValues = property.rich_text.map(text => text.plain_text.trim());
            let formattedValue = '';
              for (let i = 0; i < plainTextValues.length; i += 2) {
                  formattedValue += `${plainTextValues[i]} : ${plainTextValues[i + 1]}\n`;
              }
               value = formattedValue.trim();
        }
        
        if (value !== null && value !== '') {
            if (!value.includes('凸】')) {
                embed.addField('- '+key+' -', typeof value === 'object' ? JSON.stringify(value) : value);
            }
        }
      });
      
    // URLを取得
    const imageURL = data.results[0].icon.external.url;
    embed.setThumbnail(imageURL)
    
    console.log(embed.fields);
    
    message.channel.send({ embeds: [embed] })
    /*
    const pageId = notionurl.split('/').pop();
    console.log(pageId);
    const page_url = `https://api.notion.com/v1/pages/${pageId}`;
    const page_requestOptions = {
      method: 'GET',
      headers: headers,
    };
    fetch(page_url, page_requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    */
    
    })
    .catch(error => console.error('Error:', error));
  
});


client.login(process.env.DISCORD_BOT_TOKEN);
