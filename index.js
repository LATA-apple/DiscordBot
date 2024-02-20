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
  // 原神・テスト用、 個人・テスト用、 原神・キャラ情報 のみ許可
  if (message.channel.id !== '1198496932654501958' && message.channel.id !== '1206824509538308116' && message.channel.id !== '1197742966777839718') return;
  
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
            if (key === '目標ステータス') {
              for (let i = 0; i < plainTextValues.length; i += 2) {
                formattedValue += `${plainTextValues[i]} : ${plainTextValues[i + 1]}\n`;
              }
            } else {
              formattedValue = plainTextValues.join('\n');
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

client.on('messageCreate', async message => {
  // Ignore messages from other bots
  if (message.author.bot) return;
  
  console.log(message.author.username);
  // lata19760401のみ許可
  //if (message.author.username != 'lata19760401') return;
  // Check if the message is from the specified channels
  console.log(message.channel.id);
  // 原神・テスト用、 個人・テスト用、 原神・自慢の聖遺物を貼っていけぇ！ のみ許可
  if (message.channel.id !== '1198496932654501958' && message.channel.id !== '1206824509538308116' && message.channel.id !== '1196454920220586044') return;
  
  // Check if message contains attachments
  if (message.attachments.size > 0) {
    // Iterate over attachments
    for (const attachment of message.attachments.values()) {
      // Check if attachment is an image
      if (attachment.contentType.startsWith('image')) {
        try {
          // Send a message to indicate that the bot is processing the image
          const processingMessage = await message.reply('画像から文字を抽出/スコアを計算中…\n(40秒程お待ちください…)');
          // Get image URL
          const url = attachment.url;
          console.log(url)
          // Create Tesseract worker
          const worker = await createWorker('jpn');
          await worker.load();
          await worker.loadLanguage('jpn');
          await worker.initialize('jpn');
          // Recognize text from image
          const { data: { text } } = await worker.recognize(url);
          const filteredText = text.replace(/[^\S\n]/g, '');
          const logText = filteredText.replace(/^\s*[\r\n]/gm, '');
          const channel = await client.channels.fetch('1207204533005189131');
          const data_collection = await client.channels.fetch('1208468886517981195');
          channel.send('----------\n['+ message.author.username + ']\n'+url+ '\n'+logText );
          
          let type_of_relics = '';
          if (filteredText.includes('死の羽')) {
            type_of_relics = '死の羽'
          } else if (filteredText.includes('時の砂')) {
            type_of_relics = '時の砂'
          } else if (filteredText.includes('空の杯')) {
            type_of_relics = '空の杯'
          } else if (filteredText.includes('理の冠')) {
            type_of_relics = '理の冠'
          } else {
            type_of_relics = '生の花'
          }
          
          
          const linesStartingWithBullet = filteredText.split('\n')
          //追加→ || line.trim().startsWith('.')  
          .filter(line => line.trim().startsWith('・') || line.trim().startsWith('*') || line.trim().startsWith('･') || line.trim().startsWith('＊') || line.trim().startsWith('.'))
          //追加→ |^.
          .map(line => line.replace(/^・|^(\*)|^･|^＊|^./, ''));
          const cleanedText = linesStartingWithBullet.join('\n');
          // Extract values for specified patterns
          let critical = 0;
          let critical_hurt = 0;
          let attack = 0;
          let attack_num = 0;
          let defence = 0;
          let defence_num = 0;
          let hp = 0;
          let hp_num = 0;
          let charge_efficiency = 0;
          let element_mastery = 0;
          
          cleanedText.split('\n').forEach(line => {
            if ((line.includes('会心率'))&&(line.includes('%'))) {
              critical = parseFloat((line.replace('会心率+', '').replace('%', '').trim()).replace(/[^\d.]/g, ""));
            } else if ((line.includes('会心ダメージ'))&&(line.includes('%'))) {
              critical_hurt = parseFloat((line.replace('会心ダメージ+', '').replace('%', '').trim()).replace(/[^\d.]/g, ""));
            } else if (line.includes('攻撃力')) {
              if (line.includes('%')) {
                attack = parseFloat((line.replace('攻撃力+', '').replace('%', '').trim()).replace(/[^\d.]/g, ""));
              } else {
                attack_num = parseFloat((line.replace('攻撃力+', '').trim()).replace(/[^\d.]/g, ""));
              }
            } else if (line.includes('防御力')) {
              if (line.includes('%')) {
                defence = parseFloat((line.replace('防御力+', '').replace('%', '').trim()).replace(/[^\d.]/g, ""));
              } else {
                defence_num = parseFloat((line.replace('防御力+', '').trim()).replace(/[^\d.]/g, ""));
              }
            } else if (line.includes('HP')) {
              if (line.includes('%')) {
                hp = parseFloat((line.replace('HP+', '').replace('%', '').trim()).replace(/[^\d.]/g, ""));
              } else {
                hp_num = parseFloat((line.replace('HP+', '').trim()).replace(/[^\d.]/g, ""));
              }
            } else if ((line.includes('元素チャージ効率'))&&(line.includes('%'))) {
              charge_efficiency = parseFloat((line.replace('元素チャージ効率+', '').replace('%', '').trim()).replace(/[^\d.]/g, ""));
            } else if (line.includes('元素熟知')) {
              element_mastery = parseFloat((line.replace('元素熟知+', '').trim()).replace(/[^\d.]/g, ""));
            }
          });
          //値調整用ここから
          if (critical == 1.3) {
            critical = 11.3
          } else if (critical_hurt == 1.7) {
            critical_hurt = 11.7
          } else if (attack == 1.1) {
            attack = 11.1
          } else if (defence == 1.7) {
            defence = 11.7
          } else if (hp == 1.0) {
            hp = 11.0
          } else if (hp == 1.1) {
            hp = 11.1
          } else if (charge_efficiency == 1.7) {
            charge_efficiency = 11.7
          }
          //値調整用ここまで
          
          let critical_text = '会心率+'+critical+'%';
          let critical_hurt_text = '会心ダメージ+'+critical_hurt+'%';
          let attack_text = '攻撃力+'+attack+'%';
          let attack_num_text = '攻撃力+'+attack_num;
          let defence_text = '防御力+'+defence+'%';
          let defence_num_text = '防御力+'+defence_num;
          let hp_text = 'HP+'+hp+'%';
          let hp_num_text = 'HP+'+hp_num;
          let charge_efficiency_text = '元素チャージ効率+'+charge_efficiency+'%';
          let element_mastery_text = '元素熟知+'+element_mastery;
          
          let orthopedics_text = '';
          if (critical !== 0) {
              orthopedics_text += critical_text + '\n';
          }
          if (critical_hurt !== 0) {
              orthopedics_text += critical_hurt_text + '\n';
          }
          if (attack !== 0) {
              orthopedics_text += attack_text + '\n';
          }
          if (attack_num !== 0) {
              orthopedics_text += attack_num_text + '\n';
          }
          if (defence !== 0) {
              orthopedics_text += defence_text + '\n';
          }
          if (defence_num !== 0) {
              orthopedics_text += defence_num_text + '\n';
          }
          if (hp !== 0) {
              orthopedics_text += hp_text + '\n';
          }
          if (hp_num !== 0) {
              orthopedics_text += hp_num_text + '\n';
          }
          if (charge_efficiency !== 0) {
              orthopedics_text += charge_efficiency_text + '\n';
          }
          if (element_mastery !== 0) {
              orthopedics_text += element_mastery_text + '\n';
          }
          channel.send(critical_text+'\n'+critical_hurt_text+'\n'+attack_text+'\n'+attack_num_text+'\n'+defence_text+'\n'+defence_num_text+'\n'+hp_text+'\n'+hp_num_text+'\n'+charge_efficiency_text+'\n'+element_mastery_text );
          channel.send(orthopedics_text);
          data_collection.send(orthopedics_text);
          
          let critical_value = critical*2+critical_hurt;
          let critical_attack_value = critical*2+critical_hurt+attack;
          let critical_defence_value = critical*2+critical_hurt+defence;
          let critical_charge_efficiency_value = critical*2+critical_hurt+charge_efficiency;
          let critical_hp_value = critical*2+critical_hurt+hp;
          let critical_element_mastery_value = critical*2+critical_hurt+(element_mastery*0.25);
          
          let critical_rank = '';
          let critical_attack_rank = '';
          let critical_defence_rank = '';
          let critical_hp_rank = '';
          let critical_charge_efficiency_rank = '';
          let critical_element_mastery_rank = '';
          
          //会心型
          if ((type_of_relics.includes('生の花')) || (type_of_relics.includes('死の羽'))) {
            if (critical_value >= 50) {
                critical_rank = '理論値';
            } else if (critical_value >= 45) {
                critical_rank = '厳選ランクS';
            } else if (critical_value >= 40) {
                critical_rank = '厳選ランクA';
            } else if (critical_value >= 30) {
                critical_rank = '厳選ランクB';
            } else if (critical_value >= 20) {
                critical_rank = '仮聖遺物';
            } else {
                critical_rank = 'ゴミ';
            }
          } else if ((type_of_relics.includes('時の砂')) || (type_of_relics.includes('空の杯'))) {
            if (critical_value >= 45) {
                critical_rank = '理論値';
            } else if (critical_value >= 40) {
                critical_rank = '厳選ランクS';
            } else if (critical_value >= 35) {
                critical_rank = '厳選ランクA';
            } else if (critical_value >= 25) {
                critical_rank = '厳選ランクB';
            } else if (critical_value >= 15) {
                critical_rank = '仮聖遺物';
            } else {
                critical_rank = 'ゴミ';
            }
          } else if ((type_of_relics.includes('理の冠'))) {
            if (critical_value >= 40) {
                critical_rank = '理論値';
            } else if (critical_value >= 35) {
                critical_rank = '厳選ランクS';
            } else if (critical_value >= 30) {
                critical_rank = '厳選ランクA';
            } else if (critical_value >= 20) {
                critical_rank = '厳選ランクB';
            } else if (critical_value >= 10) {
                critical_rank = '仮聖遺物';
            } else {
                critical_rank = 'ゴミ';
            }
          }
          console.log(critical_rank)
          
          //攻撃型
          if ((type_of_relics.includes('生の花')) || (type_of_relics.includes('死の羽'))) {
            if (critical_attack_value >= 50) {
                critical_attack_rank = '理論値';
            } else if (critical_attack_value >= 45) {
                critical_attack_rank = '厳選ランクS';
            } else if (critical_attack_value >= 40) {
                critical_attack_rank = '厳選ランクA';
            } else if (critical_attack_value >= 30) {
                critical_attack_rank = '厳選ランクB';
            } else if (critical_attack_value >= 20) {
                critical_attack_rank = '仮聖遺物';
            } else {
                critical_attack_rank = 'ゴミ';
            }
          } else if ((type_of_relics.includes('時の砂')) || (type_of_relics.includes('空の杯'))) {
            if (critical_attack_value >= 45) {
                critical_attack_rank = '理論値';
            } else if (critical_attack_value >= 40) {
                critical_attack_rank = '厳選ランクS';
            } else if (critical_attack_value >= 35) {
                critical_attack_rank = '厳選ランクA';
            } else if (critical_attack_value >= 25) {
                critical_attack_rank = '厳選ランクB';
            } else if (critical_attack_value >= 15) {
                critical_attack_rank = '仮聖遺物';
            } else {
                critical_attack_rank = 'ゴミ';
            }
          } else if ((type_of_relics.includes('理の冠'))) {
            if (critical_attack_value >= 40) {
                critical_attack_rank = '理論値';
            } else if (critical_attack_value >= 35) {
                critical_attack_rank = '厳選ランクS';
            } else if (critical_attack_value >= 30) {
                critical_attack_rank = '厳選ランクA';
            } else if (critical_attack_value >= 20) {
                critical_attack_rank = '厳選ランクB';
            } else if (critical_attack_value >= 10) {
                critical_attack_rank = '仮聖遺物';
            } else {
                critical_attack_rank = 'ゴミ';
            }
          }
          console.log(critical_attack_rank)
          
          //防御型
          if ((type_of_relics.includes('生の花')) || (type_of_relics.includes('死の羽'))) {
            if (critical_defence_value >= 50) {
                critical_defence_rank = '理論値';
            } else if (critical_defence_value >= 45) {
                critical_defence_rank = '厳選ランクS';
            } else if (critical_defence_value >= 40) {
                critical_defence_rank = '厳選ランクA';
            } else if (critical_defence_value >= 30) {
                critical_defence_rank = '厳選ランクB';
            } else if (critical_defence_value >= 20) {
                critical_defence_rank = '仮聖遺物';
            } else {
                critical_defence_rank = 'ゴミ';
            }
          } else if ((type_of_relics.includes('時の砂')) || (type_of_relics.includes('空の杯'))) {
            if (critical_defence_value >= 45) {
                critical_defence_rank = '理論値';
            } else if (critical_defence_value >= 40) {
                critical_defence_rank = '厳選ランクS';
            } else if (critical_defence_value >= 35) {
                critical_defence_rank = '厳選ランクA';
            } else if (critical_defence_value >= 25) {
                critical_defence_rank = '厳選ランクB';
            } else if (critical_defence_value >= 15) {
                critical_defence_rank = '仮聖遺物';
            } else {
                critical_defence_rank = 'ゴミ';
            }
          } else if ((type_of_relics.includes('理の冠'))) {
            if (critical_defence_value >= 40) {
                critical_defence_rank = '理論値';
            } else if (critical_defence_value >= 35) {
                critical_defence_rank = '厳選ランクS';
            } else if (critical_defence_value >= 30) {
                critical_defence_rank = '厳選ランクA';
            } else if (critical_defence_value >= 20) {
                critical_defence_rank = '厳選ランクB';
            } else if (critical_defence_value >= 10) {
                critical_defence_rank = '仮聖遺物';
            } else {
                critical_defence_rank = 'ゴミ';
            }
          }
          console.log(critical_defence_rank)
          
          //HP型
          if ((type_of_relics.includes('生の花')) || (type_of_relics.includes('死の羽'))) {
            if (critical_hp_value >= 50) {
                critical_hp_rank = '理論値';
            } else if (critical_hp_value >= 45) {
                critical_hp_rank = '厳選ランクS';
            } else if (critical_hp_value >= 40) {
                critical_hp_rank = '厳選ランクA';
            } else if (critical_hp_value >= 30) {
                critical_hp_rank = '厳選ランクB';
            } else if (critical_hp_value >= 20) {
                critical_hp_rank = '仮聖遺物';
            } else {
                critical_hp_rank = 'ゴミ';
            }
          } else if ((type_of_relics.includes('時の砂')) || (type_of_relics.includes('空の杯'))) {
            if (critical_hp_value >= 45) {
                critical_hp_rank = '理論値';
            } else if (critical_hp_value >= 40) {
                critical_hp_rank = '厳選ランクS';
            } else if (critical_hp_value >= 35) {
                critical_hp_rank = '厳選ランクA';
            } else if (critical_hp_value >= 25) {
                critical_hp_rank = '厳選ランクB';
            } else if (critical_hp_value >= 15) {
                critical_hp_rank = '仮聖遺物';
            } else {
                critical_hp_rank = 'ゴミ';
            }
          } else if ((type_of_relics.includes('理の冠'))) {
            if (critical_hp_value >= 40) {
                critical_hp_rank = '理論値';
            } else if (critical_hp_value >= 35) {
                critical_hp_rank = '厳選ランクS';
            } else if (critical_hp_value >= 30) {
                critical_hp_rank = '厳選ランクA';
            } else if (critical_hp_value >= 20) {
                critical_hp_rank = '厳選ランクB';
            } else if (critical_hp_value >= 10) {
                critical_hp_rank = '仮聖遺物';
            } else {
                critical_hp_rank = 'ゴミ';
            }
          }
          console.log(critical_hp_rank)
          
          //元素チャージ効率型
          if ((type_of_relics.includes('生の花')) || (type_of_relics.includes('死の羽'))) {
            if (critical_charge_efficiency_value >= 50) {
                critical_charge_efficiency_rank = '理論値';
            } else if (critical_charge_efficiency_value >= 45) {
                critical_charge_efficiency_rank = '厳選ランクS';
            } else if (critical_charge_efficiency_value >= 40) {
                critical_charge_efficiency_rank = '厳選ランクA';
            } else if (critical_charge_efficiency_value >= 30) {
                critical_charge_efficiency_rank = '厳選ランクB';
            } else if (critical_charge_efficiency_value >= 20) {
                critical_charge_efficiency_rank = '仮聖遺物';
            } else {
                critical_charge_efficiency_rank = 'ゴミ';
            }
          } else if ((type_of_relics.includes('時の砂')) || (type_of_relics.includes('空の杯'))) {
            if (critical_charge_efficiency_value >= 45) {
                critical_charge_efficiency_rank = '理論値';
            } else if (critical_charge_efficiency_value >= 40) {
                critical_charge_efficiency_rank = '厳選ランクS';
            } else if (critical_charge_efficiency_value >= 35) {
                critical_charge_efficiency_rank = '厳選ランクA';
            } else if (critical_charge_efficiency_value >= 25) {
                critical_charge_efficiency_rank = '厳選ランクB';
            } else if (critical_charge_efficiency_value >= 15) {
                critical_charge_efficiency_rank = '仮聖遺物';
            } else {
                critical_charge_efficiency_rank = 'ゴミ';
            }
          } else if ((type_of_relics.includes('理の冠'))) {
            if (critical_charge_efficiency_value >= 40) {
                critical_charge_efficiency_rank = '理論値';
            } else if (critical_charge_efficiency_value >= 35) {
                critical_charge_efficiency_rank = '厳選ランクS';
            } else if (critical_charge_efficiency_value >= 30) {
                critical_charge_efficiency_rank = '厳選ランクA';
            } else if (critical_charge_efficiency_value >= 20) {
                critical_charge_efficiency_rank = '厳選ランクB';
            } else if (critical_charge_efficiency_value >= 10) {
                critical_charge_efficiency_rank = '仮聖遺物';
            } else {
                critical_charge_efficiency_rank = 'ゴミ';
            }
          }
          console.log(critical_charge_efficiency_rank)
          
          //元素熟知型
          if ((type_of_relics.includes('生の花')) || (type_of_relics.includes('死の羽'))) {
            if (critical_element_mastery_value >= 50) {
                critical_element_mastery_rank = '理論値';
            } else if (critical_element_mastery_value >= 45) {
                critical_element_mastery_rank = '厳選ランクS';
            } else if (critical_element_mastery_value >= 40) {
                critical_element_mastery_rank = '厳選ランクA';
            } else if (critical_element_mastery_value >= 30) {
                critical_element_mastery_rank = '厳選ランクB';
            } else if (critical_element_mastery_value >= 20) {
                critical_element_mastery_rank = '仮聖遺物';
            } else {
                critical_element_mastery_rank = 'ゴミ';
            }
          } else if ((type_of_relics.includes('時の砂')) || (type_of_relics.includes('空の杯'))) {
            if (critical_element_mastery_value >= 45) {
                critical_element_mastery_rank = '理論値';
            } else if (critical_element_mastery_value >= 40) {
                critical_element_mastery_rank = '厳選ランクS';
            } else if (critical_element_mastery_value >= 35) {
                critical_element_mastery_rank = '厳選ランクA';
            } else if (critical_element_mastery_value >= 25) {
                critical_element_mastery_rank = '厳選ランクB';
            } else if (critical_element_mastery_value >= 15) {
                critical_element_mastery_rank = '仮聖遺物';
            } else {
                critical_element_mastery_rank = 'ゴミ';
            }
          } else if ((type_of_relics.includes('理の冠'))) {
            if (critical_element_mastery_value >= 40) {
                critical_element_mastery_rank = '理論値';
            } else if (critical_element_mastery_value >= 35) {
                critical_element_mastery_rank = '厳選ランクS';
            } else if (critical_element_mastery_value >= 30) {
                critical_element_mastery_rank = '厳選ランクA';
            } else if (critical_element_mastery_value >= 20) {
                critical_element_mastery_rank = '厳選ランクB';
            } else if (critical_element_mastery_value >= 10) {
                critical_element_mastery_rank = '仮聖遺物';
            } else {
                critical_element_mastery_rank = 'ゴミ';
            }
          }
          console.log(critical_element_mastery_rank)
          
                    
          console.log(cleanedText)
          // Terminate worker
          await worker.terminate();
          // Reply with the recognized text
          /*
          let relic_value = (cleanedText)+'\n【スコア】\n会心値 : '+(critical_value)+'\n会心+攻撃力値 : '+(critical_attack_value)+'\n【会心ランク】\n'+(critical_rank)+'\n【会心＋攻撃力％ランク】\n'+(critical_attack_rank)
          let error_value = (relic_value)+'\n(⚠️画像から正確にデータが読み取れなかった可能性があります。\nトリミングをして、もう一度お試しください。⚠️)'
          if ((critical_value == 0)||(critical_attack_value == 0)) {
              relic_value = error_value;
            }
          processingMessage.edit(relic_value)
          */
          
          const embed = new MessageEmbed()
            .setTitle('- 聖遺物スコア -')
            .setColor('RANDOM')
            .setThumbnail(url)
            .addField('聖遺物情報','【'+type_of_relics+'】\n'+orthopedics_text)
            //.addField('- スコア -','会心値 : '+(critical_value)+'\n会心+攻撃力値 : '+(critical_attack_value)+'\n会心+防御力値 : '+(critical_defence_value)+'\n会心+HP値 : '+(critical_hp_value)+'\n会心+元素ﾁｬｰｼﾞ効率値 : '+(critical_charge_efficiency_value)+'\n会心+元素熟知値 : '+(critical_element_mastery_value))
            .addField('- 会心 -',critical_value+'\n'+critical_rank,true)
            .addField('- 会心+攻撃力% -',critical_attack_value+'\n'+critical_attack_rank,true)
            .addField('- 会心+防御力% -',critical_defence_value+'\n'+critical_defence_rank,true)
            .addField('- 会心+HP% -',critical_hp_value+'\n'+critical_hp_rank,true)
            .addField('- 会心+元素ﾁｬｰｼﾞ効率 -',critical_charge_efficiency_value+'\n'+critical_charge_efficiency_rank,true)
            .addField('- 会心+元素熟知 -',critical_element_mastery_value+'\n'+critical_element_mastery_rank,true)
            .setDescription('<@'+message.author+'>')
          
          console.log(embed)
          processingMessage.delete();
          message.reply({ embeds: [embed] })
          
        } catch (error) {
          console.error('Error processing image:', error);
          message.reply('<@691324906729898024>、エラーが発生しました。');
        }
      }
    }
  }
});


client.login(process.env.DISCORD_BOT_TOKEN);
