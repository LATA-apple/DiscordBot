const { Client, Intents, MessageEmbed } = require("discord.js");
const { createWorker } = require('tesseract.js');
const fetch = require('node-fetch');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
//オンライン時
client.on("ready", () => {
  console.log(`==== Logged in: ${client.user.tag} ====`);
  console.log('Bot is ready!');
  client.user.setPresence({ activity: { name: "げーむ" } });
});

const databaseId = '9403ad41aa344441951044a6656d0d9a';
const url = `https://api.notion.com/v1/databases/${databaseId}/query`;

//キャラ情報Notion自動読み込み
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
  
  //キャラ情報Notion自動読み出し
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
    })
    .catch(error => console.error('Error:', error));
  
});
//聖遺物画像自動認識・自動スコア算出
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
          
          const embed = new MessageEmbed()
            .setTitle('- 聖遺物スコア -')
            .setColor('RANDOM')
            .setThumbnail(url)
          
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
          .filter(line => line.trim().startsWith('・') || line.trim().startsWith('*') || line.trim().startsWith('･') || line.trim().startsWith('＊'))
          //追加→ |^.
          .map(line => line.replace(/^・|^(\*)|^･|^＊/, ''));
          const cleanedText = linesStartingWithBullet.join('\n');
          // Extract values for specified patterns
          let critical = 0;
          let critical_hurt = 0;
          let attack = 0;
          let attack_num = 0;
          let defense = 0;
          let defense_num = 0;
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
                attack_num = parseFloat((line.replace('攻撃力+', '').trim()).replace(/[^\d.]/g, ""));/////
              }
            } else if (line.includes('防御力')) {
              if (line.includes('%')) {
                defense = parseFloat((line.replace('防御力+', '').replace('%', '').trim()).replace(/[^\d.]/g, ""));
              } else {
                defense_num = parseFloat((line.replace('防御力+', '').trim()).replace(/[^\d.]/g, ""));/////
              }
            } else if (line.includes('HP')) {
              if (line.includes('%')) {
                hp = parseFloat((line.replace('HP+', '').replace('%', '').trim()).replace(/[^\d.]/g, ""));
              } else {
                hp_num = parseFloat((line.replace('HP+', '').trim()).replace(/[^\d.]/g, "").replace('.', ''));/////
              }
            } else if ((line.includes('元素チャージ効率'))&&(line.includes('%'))) {
              charge_efficiency = parseFloat((line.replace('元素チャージ効率+', '').replace('%', '').trim()).replace(/[^\d.]/g, ""));
            } else if (line.includes('元素熟知')) {
              element_mastery = parseFloat((line.replace('元素熟知+', '').trim()).replace(/[^\d.]/g, ""));/////
            }
          });
          //値調整用ここから
          if (critical == 1.3) {
            critical = 11.3
          } else if (critical_hurt == 1.7) {
            critical_hurt = 11.7
          } else if (attack == 1.1) {
            attack = 11.1
          } else if (defense == 1.7) {
            defense = 11.7
          } else if (hp == 1.0) {
            hp = 11.0
          } else if (hp == 1.1) {
            hp = 11.1
          } else if (charge_efficiency == 1.7) {
            charge_efficiency = 11.7
          }
          //値調整用ここまで
          
          //少数以下１位処理ここから
          if ((critical * 10 < 1)&&(critical != 0)) {
              critical = (critical).toFixed(1);
          }
          if ((critical_hurt * 10 < 1)&&(critical_hurt != 0)) {
              critical_hurt = (critical_hurt).toFixed(1);
          }
          if ((attack * 10 < 1)&&(attack != 0)) {
              attack = (attack).toFixed(1);
          }
          if ((attack_num * 10 < 1)&&(attack_num != 0)) {
              attack_num = attack_num;
          }
          if ((defense * 10 < 1)&&(defense != 0)) {
              defense = (defense).toFixed(1);
          }
          if ((defense_num * 10 < 1)&&(defense_num != 0)) {
              defense_num = defense_num;
          }
          if ((hp * 10 < 1)&&(hp != 0)) {
              hp = (hp).toFixed(1);
          }
          if ((hp_num * 10 < 1)&&(hp_num != 0)) {
              hp_num = +hp_num;
          }
          if ((charge_efficiency * 10 < 1)&&(charge_efficiency != 0)) {
              charge_efficiency = (charge_efficiency).toFixed(1);
          }
          if ((element_mastery * 10 < 1)&&(element_mastery != 0)) {
              element_mastery = element_mastery;
          }
          //少数以下１位処理ここまで
          
          let critical_text = '会心率+'+critical+'%';
          let critical_hurt_text = '会心ダメージ+'+critical_hurt+'%';
          let attack_text = '攻撃力+'+attack+'%';
          let attack_num_text = '攻撃力+'+attack_num;
          let defense_text = '防御力+'+defense+'%';
          let defense_num_text = '防御力+'+defense_num;
          let hp_text = 'HP+'+hp+'%';
          let hp_num_text = 'HP+'+hp_num;
          let charge_efficiency_text = '元素チャージ効率+'+charge_efficiency+'%';
          let element_mastery_text = '元素熟知+'+element_mastery;
          
          //サブステ上昇値・上昇率検索
          let search_url = '';
          
          const headers = {
            'Content-Type': 'application/json',
            'Notion-Version': '2022-06-28',
            'Authorization': 'Bearer secret_yRXLwrnuBgXoquzA3L6j7dKMMIfbMSiacqMXdyFQjGV'
          };
          
          let up_num = '';
          let up_percent = '';
          let search_result = '';
          
          //ここまで
          
          let orthopedics_text = '';
          if (critical !== 0) {
              const critical_list = {
                '23.3':'　(5回, 600%)',
               '23.0':'　(5回, 590%)',
               '22.6':'　(5回, 580%)',
               '22.2':'　(5回, 570%)',
               '21.8':'　(5回, 560%)',
               '21.4':'　(5回, 550%)',
               '21.0':'　(5回, 540%)',
               '20.6':'　(5回, 530%)',
               '20.2':'　(5回, 520%)',
               '19.8':'　(5回, 510%)',
               '19.5':'　(4or5回, 500%)',
               '19.1':'　(4or5回, 490%)',
               '18.7':'　(4or5回, 480%)',
               '18.3':'　(4or5回, 470%)',
               '17.9':'　(4or5回, 460%)',
               '17.5':'　(4or5回, 450%)',
               '17.1':'　(4or5回, 440%)',
               '16.7':'　(4or5回, 430%)',
               '16.3':'　(4or5回, 420%)',
               '15.9':'　(4回, 410%)',
               '15.6':'　(3or4回, 400%)',
               '15.2':'　(3or4回, 390%)',
               '14.8':'　(3or4回, 380%)',
               '14.4':'　(3or4回, 370%)',
               '14.0':'　(3or4回, 360%)',
               '13.6':'　(3or4回, 350%)',
               '13.2':'　(3回, 340%)',
               '12.8':'　(3回, 330%)',
               '12.4':'　(3回, 320%)',
               '12.1':'　(3回, 310%)',
               '11.7':'　(2or3回, 300%)',
               '11.3':'　(2or3回, 290%)',
               '10.9':'　(2or3回, 280%)',
               '10.5':'　(2回, 270%)',
               '10.1':'　(2回, 260%)',
               '9.7':'　(2回, 250%)',
               '9.3':'　(2回, 240%)',
               '8.9':'　(2回, 230%)',
               '8.6':'　(2回, 220%)',
               '8.2':'　(2回, 210%)',
               '7.8':'　(1回, 200%)',
               '7.4':'　(1回, 190%)',
               '7.0':'　(1回, 180%)',
               '6.6':'　(1回, 170%)',
               '6.2':'　(1回, 160%)',
               '5.8':'　(1回, 150%)',
               '5.4':'　(1回, 140%)',
               '3.9':'　(0回, 100%)',
               '3.5':'　(0回, 90%)',
               '3.1':'　(0回, 80%)',
               '2.7':'　(0回, 70%)'
              };
              search_result = critical_list[critical];
              orthopedics_text += critical_text + search_result + '\n';
          }
          if (critical_hurt !== 0) {
              const critical_hurt_list = {
              '46.6':'　(5回, 600%)',
              '45.8':'　(5回, 590%)',
              '45.1':'　(5回, 580%)',
              '44.3':'　(5回, 570%)',
              '43.5':'　(5回, 560%)',
              '42.7':'　(5回, 550%)',
              '42.0':'　(5回, 540%)',
              '41.2':'　(5回, 530%)',
              '40.4':'　(5回, 520%)',
              '39.6':'　(5回, 510%)',
              '38.9':'　(5回, 500%)',
              '38.1':'　(4or5回, 490%)',
              '37.3':'　(4or5回, 480%)',
              '36.5':'　(4or5回, 470%)',
              '35.8':'　(4or5回, 460%)',
              '35.0':'　(4or5回, 450%)',
              '34.2':'　(4or5回, 440%)',
              '33.4':'　(4or5回, 430%)',
              '32.7':'　(4or5回, 420%)',
              '31.9':'　(4回, 410%)',
              '31.1':'　(3or4回, 400%)',
              '30.3':'　(3or4回, 390%)',
              '29.5':'　(3or4回, 380%)',
              '28.8':'　(3or4回, 370%)',
              '28.0':'　(3or4回, 360%)',
              '27.2':'　(3or4回, 350%)',
              '26.4':'　(3回, 340%)',
              '25.7':'　(3回, 330%)',
              '24.9':'　(3回, 320%)',
              '24.1':'　(3回, 310%)',
              '23.3':'　(2or3回, 300%)',
              '22.5':'　(2or3回, 290%)',
              '21.8':'　(2or3回, 280%)',
              '21.0':'　(2回, 270%)',
              '20.2':'　(2回, 260%)',
              '19.4':'　(2回, 250%)',
              '18.7':'　(2回, 240%)',
              '17.9':'　(2回, 230%)',
              '17.1':'　(2回, 220%)',
              '16.3':'　(2回, 210%)',
              '15.5':'　(1回, 200%)',
              '14.8':'　(1回, 190%)',
              '14.0':'　(1回, 180%)',
              '13.2':'　(1回, 170%)',
              '12.4':'　(1回, 160%)',
              '11.7':'　(1回, 150%)',
              '10.9':'　(1回, 140%)',
              '7.8':'　(0回, 100%)',
              '7.0':'　(0回, 90%)',
              '6.2':'　(0回, 80%)',
              '5.4':'　(0回, 70%)'
              };
              search_result = critical_hurt_list[critical_hurt];
              orthopedics_text += critical_hurt_text + search_result + '\n';
          }
          if (attack !== 0) {
              const attack_list = {
                '35.0':'　(5回, 600%)',
                '34.4':'　(5回, 590%)',
                '33.8':'　(5回, 580%)',
                '33.2':'　(5回, 570%)',
                '32.7':'　(5回, 560%)',
                '32.1':'　(5回, 550%)',
                '31.5':'　(5回, 540%)',
                '30.9':'　(5回, 530%)',
                '30.3':'　(5回, 520%)',
                '29.7':'　(5回, 510%)',
                '29.2':'　(4or5回, 500%)',
                '28.6':'　(4or5回, 490%)',
                '28.0':'　(4or5回, 480%)',
                '27.4':'　(4or5回, 470%)',
                '26.8':'　(4or5回, 460%)',
                '26.3':'　(4or5回, 450%)',
                '25.7':'　(4or5回, 440%)',
                '25.1':'　(4or5回, 430%)',
                '24.5':'　(4or5回, 420%)',
                '23.9':'　(4回, 410%)',
                '23.3':'　(3or4回, 400%)',
                '22.7':'　(3or4回, 390%)',
                '22.2':'　(3or4回, 380%)',
                '21.6':'　(3or4回, 370%)',
                '21.0':'　(3or4回, 360%)',
                '20.4':'　(3or4回, 350%)',
                '19.8':'　(3回, 340%)',
                '19.2':'　(3回, 330%)',
               '18.7':'　(3回, 320%)',
                '18.1':'　(3回, 310%)',
                '17.5':'　(2or3回, 300%)',
                '16.9':'　(2or3回, 290%)',
                '16.3':'　(2or3回, 280%)',
                '15.8':'　(2回, 270%)',
                '15.2':'　(2回, 260%)',
                '14.6':'　(2回, 250%)',
                '14.0':'　(2回, 240%)',
                '13.4':'　(2回, 230%)',
                '12.8':'　(2回, 220%)',
                '12.2':'　(2回, 210%)',
                '11.7':'　(1回, 200%)',
                '11.1':'　(1回, 190%)',
                '10.5':'　(1回, 180%)',
                '9.9':'　(1回, 170%)',
                '9.3':'　(1回, 160%)',
                '8.7':'　(1回, 150%)',
                '8.2':'　(1回, 140%)',
                '5.8':'　(0回, 100%)',
                '5.3':'　(0回, 90%)',
                '4.7':'　(0回, 80%)',
                '4.1':'　(0回, 70%)'
              };
              search_result = attack_list[attack];
              orthopedics_text += attack_text + search_result + '\n';
          }
          if (attack_num !== 0) {
              const attack_num_list = {
                '117':'　(5回, 600%)',
                '115':'　(5回, 590%)',
                '113':'　(5回, 580%)',
                '111':'　(5回, 570%)',
                '109':'　(5回, 560%)',
                '107':'　(5回, 550%)',
                '105':'　(5回, 540%)',
                '103':'　(5回, 530%)',
                '101':'　(5回, 520%)',
                '99':'　(5回, 510%)',
                '97':'　(4or5回, 500%)',
                '95':'　(4or5回, 490%)',
                '93':'　(4or5回, 480%)',
                '91':'　(4or5回, 470%)',
                '89':'　(4or5回, 460%)',
                '88':'　(4or5回, 450%)',
                '86':'　(4or5回, 440%)',
                '84':'　(4or5回, 430%)',
                '82':'　(4or5回, 420%)',
                '80':'　(4回, 410%)',
                '78':'　(3or4回, 400%)',
                '76':'　(3or4回, 390%)',
                '74':'　(3or4回, 380%)',
                '72':'　(3or4回, 370%)',
                '70':'　(3or4回, 360%)',
                '68':'　(3or4回, 350%)',
                '66':'　(3回, 340%)',
                '64':'　(3回, 330%)',
                '62':'　(3回, 320%)',
                '60':'　(3回, 310%)',
                '58':'　(2or3回, 300%)',
                '56':'　(2or3回, 290%)',
                '54':'　(2or3回, 280%)',
                '53':'　(2回, 270%)',
                '51':'　(2回, 260%)',
                '49':'　(2回, 250%)',
                '47':'　(2回, 240%)',
                '45':'　(2回, 230%)',
                '43':'　(2回, 220%)',
                '41':'　(2回, 210%)',
                '39':'　(1回, 200%)',
                '37':'　(1回, 190%)',
                '35':'　(1回, 180%)',
                '33':'　(1回, 170%)',
                '31':'　(1回, 160%)',
                '29':'　(1回, 150%)',
                '27':'　(1回, 140%)',
                '19':'　(0回, 100%)',
                '18':'　(0回, 90%)',
                '16':'　(0回, 80%)',
                '14':'　(0回, 70%)'
              };
              search_result = attack_num_list[attack_num];
              orthopedics_text += attack_num_text + search_result + '\n';
          }
          if (defense !== 0) {
              const defense_list = {
                '43.7':'　(5回, 600%)',
                '43.0':'　(5回, 590%)',
                '42.3':'　(5回, 580%)',
                '41.6':'　(5回, 570%)',
                '40.8':'　(5回, 560%)',
                '40.1':'　(5回, 550%)',
                '39.4':'　(5回, 540%)',
                '38.6':'　(5回, 530%)',
                '37.9':'　(5回, 520%)',
                '37.2':'　(5回, 510%)',
                '36.5':'　(4or5回, 500%)',
                '35.7':'　(4or5回, 490%)',
                '35.0':'　(4or5回, 480%)',
                '34.3':'　(4or5回, 470%)',
                '33.5':'　(4or5回, 460%)',
                '32.8':'　(4or5回, 450%)',
                '32.1':'　(4or5回, 440%)',
                '31.3':'　(4or5回, 430%)',
                '30.6':'　(4or5回, 420%)',
                '29.9':'　(4回, 410%)',
                '29.2':'　(3or4回, 400%)',
                '28.4':'　(3or4回, 390%)',
                '27.7':'　(3or4回, 380%)',
                '27.0':'　(3or4回, 370%)',
                '26.2':'　(3or4回, 360%)',
                '25.5':'　(3or4回, 350%)',
                '24.8':'　(3回, 340%)',
                '24.1':'　(3回, 330%)',
                '23.3':'　(3回, 320%)',
                '22.6':'　(3回, 310%)',
                '21.9':'　(2or3回, 300%)',
                '21.1':'　(2or3回, 290%)',
                '20.4':'　(2or3回, 280%)',
                '19.7':'　(2回, 270%)',
                '19.0':'　(2回, 260%)',
                '18.2':'　(2回, 250%)',
                '17.5':'　(2回, 240%)',
                '16.8':'　(2回, 230%)',
                '16.0':'　(2回, 220%)',
                '15.3':'　(2回, 210%)',
                '14.6':'　(1回, 200%)',
                '13.9':'　(1回, 190%)',
                '13.1':'　(1回, 180%)',
                '12.4':'　(1回, 170%)',
                '11.7':'　(1回, 160%)',
                '10.9':'　(1回, 150%)',
                '10.2':'　(1回, 140%)',
                '7.3':'　(0回, 100%)',
                '6.6':'　(0回, 90%)',
                '5.8':'　(0回, 80%)',
                '5.1':'　(0回, 70%)'
              };
              search_result = defense_list[defense];
              orthopedics_text += defense_text + search_result + '\n';
          }
          if (defense_num !== 0) {
              const defense_num_list = {
                '139':'　(5回, 600%)',
                '137':'　(5回, 590%)',
                '134':'　(5回, 580%)',
                '132':'　(5回, 570%)',
                '130':'　(5回, 560%)',
                '127':'　(5回, 550%)',
                '125':'　(5回, 540%)',
                '123':'　(5回, 530%)',
                '120':'　(5回, 520%)',
                '118':'　(5回, 510%)',
                '116':'　(4or5回, 500%)',
                '113':'　(4or5回, 490%)',
                '111':'　(4or5回, 480%)',
                '109':'　(4or5回, 470%)',
                '106':'　(4or5回, 460%)',
                '104':'　(4or5回, 450%)',
                '102':'　(4or5回, 440%)',
                '100':'　(4or5回, 430%)',
                '97':'　(4or5回, 420%)',
                '95':'　(4回, 410%)',
                '93':'　(3or4回, 400%)',
                '90':'　(3or4回, 390%)',
                '88':'　(3or4回, 380%)',
                '86':'　(3or4回, 370%)',
                '83':'　(3or4回, 360%)',
                '81':'　(3or4回, 350%)',
                '79':'　(3回, 340%)',
                '76':'　(3回, 330%)',
                '74':'　(3回, 320%)',
                '72':'　(3回, 310%)',
                '69':'　(2or3回, 300%)',
                '67':'　(2or3回, 290%)',
                '65':'　(2or3回, 280%)',
                '63':'　(2回, 270%)',
                '60':'　(2回, 260%)',
                '58':'　(2回, 250%)',
                '56':'　(2回, 240%)',
                '53':'　(2回, 230%)',
                '51':'　(2回, 220%)',
                '49':'　(2回, 210%)',
                '46':'　(1回, 200%)',
                '44':'　(1回, 190%)',
                '42':'　(1回, 180%)',
                '39':'　(1回, 170%)',
                '37':'　(1回, 160%)',
                '35':'　(1回, 150%)',
                '32':'　(1回, 140%)',
                '23':'　(0回, 100%)',
                '21':'　(0回, 90%)',
                '19':'　(0回, 80%)',
                '16':'　(0回, 70%)'
              };
              search_result = defense_num_list[defense_num];
              orthopedics_text += defense_num_text + search_result + '\n';
          }
          if (hp !== 0) {
              const hp_list = {
               '35.0':'　(5回, 600%)',
               '34.4':'　(5回, 590%)',
               '33.8':'　(5回, 580%)',
               '33.2':'　(5回, 570%)',
               '32.7':'　(5回, 560%)',
               '32.1':'　(5回, 550%)',
               '31.5':'　(5回, 540%)',
               '30.9':'　(5回, 530%)',
               '30.3':'　(5回, 520%)',
               '29.7':'　(5回, 510%)',
               '29.2':'　(4or5回, 500%)',
               '28.6':'　(4or5回, 490%)',
               '28.0':'　(4or5回, 480%)',
               '27.4':'　(4or5回, 470%)',
               '26.8':'　(4or5回, 460%)',
               '26.3':'　(4or5回, 450%)',
               '25.7':'　(4or5回, 440%)',
               '25.1':'　(4or5回, 430%)',
               '24.5':'　(4or5回, 420%)',
               '23.9':'　(4回, 410%)',
               '23.3':'　(3or4回, 400%)',
               '22.7':'　(3or4回, 390%)',
               '22.2':'　(3or4回, 380%)',
               '21.6':'　(3or4回, 370%)',
               '21.0':'　(3or4回, 360%)',
               '20.4':'　(3or4回, 350%)',
               '19.8':'　(3回, 340%)',
               '19.2':'　(3回, 330%)',
               '18.7':'　(3回, 320%)',
               '18.1':'　(3回, 310%)',
               '17.5':'　(2or3回, 300%)',
               '16.9':'　(2or3回, 290%)',
               '16.3':'　(2or3回, 280%)',
               '15.8':'　(2回, 270%)',
               '15.7':'　(2回, 270%)',
               '15.2':'　(2回, 260%)',
               '14.6':'　(2回, 250%)',
               '14.0':'　(2回, 240%)',
               '13.4':'　(2回, 230%)',
               '12.8':'　(2回, 220%)',
               '12.2':'　(2回, 210%)',
               '11.7':'　(1回, 200%)',
               '11.1':'　(1回, 190%)',
               '10.5':'　(1回, 180%)',
              '9.9':'　(1回, 170%)',
               '9.3':'　(1回, 160%)',
               '8.7':'　(1回, 150%)',
               '8.2':'　(1回, 140%)',
               '5.8':'　(0回, 100%)',
               '5.3':'　(0回, 90%)',
               '4.7':'　(0回, 80%)',
                '4.1':'　(0回, 70%)'
              };
              search_result = hp_list[hp];
              orthopedics_text += hp_text + search_result + '\n';
          }
          if (hp_num !== 0) {
              const hp_num_list = {
                '1793':'　(5回, 600%)',
                '1763':'　(5回, 590%)',
                '1733':'　(5回, 580%)',
                '1703':'　(5回, 570%)',
                '1673':'　(5回, 550%)',
                '1643':'　(5回, 540%)',
                '1613':'　(5回, 530%)',
                '1583':'　(5回, 520%)',
                '1554':'　(5回, 520%)',
                '1524':'　(5回, 510%)',
                '1494':'　(4or5回, 500%)',
                '1464':'　(4or5回, 490%)',
                '1434':'　(4or5回, 470%)',
                '1404':'　(4or5回, 460%)',
                '1374':'　(4or5回, 450%)',
                '1344':'　(4or5回, 440%)',
                '1315':'　(4or5回, 440%)',
                '1285':'　(4or5回, 430%)',
                '1255':'　(4or5回, 420%)',
                '1225':'　(4回, 410%)',
                '1195':'　(3or4回, 400%)',
                '1165':'　(3or4回, 390%)',
                '1135':'　(3or4回, 380%)',
                '1105':'　(3or4回, 370%)',
                '1076':'　(3or4回, 360%)',
                '1046':'　(3or4回, 350%)',
                '1016':'　(3回, 340%)',
                '986':'　(3回, 330%)',
                '956':'　(3回, 320%)',
                '926':'　(3回, 310%)',
                '896':'　(2or3回, 300%)',
                '866':'　(2or3回, 290%)',
                '837':'　(2or3回, 280%)',
                '807':'　(2回, 270%)',
                '777':'　(2回, 260%)',
                '747':'　(2回, 250%)',
                '717':'　(2回, 240%)',
                '687':'　(2回, 230%)',
                '657':'　(2回, 220%)',
                '627':'　(2回, 210%)',
                '598':'　(1回, 200%)',
                '568':'　(1回, 190%)',
                '538':'　(1回, 180%)',
                '508':'　(1回, 170%)',
                '478':'　(1回, 160%)',
                '448':'　(1回, 150%)',
                '418':'　(1回, 140%)',
                '299':'　(0回, 100%)',
                '269':'　(0回, 90%)',
                '239':'　(0回, 80%)',
                '209':'　(0回, 70%)'
              };
              search_result = hp_num_list[hp_num];
              orthopedics_text += hp_num_text + search_result + '\n';
          }
          if (charge_efficiency !== 0) {
              const charge_efficiency_list = {
                '38.9':'　(5回, 600%)',
                '38.2':'　(5回, 590%)',
                '37.6':'　(5回, 580%)',
                '36.9':'　(5回, 570%)',
                '36.3':'　(5回, 560%)',
                '35.6':'　(5回, 550%)',
                '35.0':'　(5回, 540%)',
                '34.3':'　(5回, 530%)',
                '33.7':'　(5回, 520%)',
                '33.0':'　(5回, 510%)',
                '32.4':'　(4or5回, 500%)',
                '31.8':'　(4or5回, 490%)',
                '31.1':'　(4or5回, 480%)',
                '30.5':'　(4or5回, 470%)',
                '29.8':'　(4or5回, 460%)',
                '29.2':'　(4or5回, 450%)',
                '28.5':'　(4or5回, 440%)',
                '27.9':'　(4or5回, 430%)',
                '27.2':'　(4or5回, 420%)',
                '26.6':'　(4回, 410%)',
                '25.9':'　(3or4回, 400%)',
                '25.3':'　(3or4回, 390%)',
                '24.6':'　(3or4回, 380%)',
                '24.0':'　(3or4回, 370%)',
                '23.3':'　(3or4回, 360%)',
                '22.7':'　(3or4回, 350%)',
                '22.0':'　(3回, 340%)',
                '21.4':'　(3回, 330%)',
                '20.7':'　(3回, 320%)',
                '20.1':'　(3回, 310%)',
                '19.4':'　(2or3回, 300%)',
                '18.8':'　(2or3回, 290%)',
                '18.1':'　(2or3回, 280%)',
                '17.5':'　(2回, 270%)',
                '16.8':'　(2回, 260%)',
                '16.2':'　(2回, 250%)',
                '15.5':'　(2回, 240%)',
                '14.9':'　(2回, 230%)',
                '14.2':'　(2回, 220%)',
                '13.6':'　(2回, 210%)',
                '13.0':'　(1回, 200%)',
                '12.3':'　(1回, 190%)',
                '11.7':'　(1回, 180%)',
                '11.0':'　(1回, 170%)',
                '10.4':'　(1回, 160%)',
                '9.7':'　(1回, 150%)',
                '9.1':'　(1回, 140%)',
                '6.5':'　(0回, 100%)',
                '5.8':'　(0回, 90%)',
                '5.2':'　(0回, 80%)',
                '4.5':'　(0回, 70%)'
              };
              search_result = charge_efficiency_list[charge_efficiency];
              orthopedics_text += charge_efficiency_text + search_result + '\n';
          }
          if (element_mastery !== 0) {
              const element_mastery_list = {
                '140':'　(5回, 600%)',
                '138':'　(5回, 590%)',
                '135':'　(5回, 580%)',
                '133':'　(5回, 570%)',
                '131':'　(5回, 560%)',
                '128':'　(5回, 550%)',
                '126':'　(5回, 540%)',
                '124':'　(5回, 530%)',
                '121':'　(5回, 520%)',
                '119':'　(5回, 510%)',
                '117':'　(4or5回, 500%)',
                '114':'　(4or5回, 490%)',
                '112':'　(4or5回, 480%)',
                '110':'　(4or5回, 470%)',
                '107':'　(4or5回, 460%)',
                '105':'　(4or5回, 450%)',
                '103':'　(4or5回, 440%)',
                '100':'　(4or5回, 430%)',
                '98':'　(4or5回, 420%)',
                '96':'　(4回, 410%)',
                '93':'　(3or4回, 400%)',
                '91':'　(3or4回, 390%)',
                '89':'　(3or4回, 380%)',
                '86':'　(3or4回, 370%)',
                '84':'　(3or4回, 360%)',
                '82':'　(3or4回, 350%)',
                '79':'　(3回, 340%)',
                '77':'　(3回, 330%)',
                '75':'　(3回, 320%)',
                '72':'　(3回, 310%)',
                '70':'　(2or3回, 300%)',
                '68':'　(2or3回, 290%)',
                '65':'　(2or3回, 280%)',
                '63':'　(2回, 270%)',
                '61':'　(2回, 260%)',
                '58':'　(2回, 250%)',
                '56':'　(2回, 240%)',
                '54':'　(2回, 230%)',
                '51':'　(2回, 220%)',
                '49':'　(2回, 210%)',
                '47':'　(1回, 200%)',
                '44':'　(1回, 190%)',
                '42':'　(1回, 180%)',
                '40':'　(1回, 170%)',
                '37':'　(1回, 160%)',
                '35':'　(1回, 150%)',
                '33':'　(1回, 140%)',
                '23':'　(0回, 100%)',
                '21':'　(0回, 90%)',
                '19':'　(0回, 80%)',
                '16':'　(0回, 70%)'
              };
              search_result = element_mastery_list[element_mastery]; 
              orthopedics_text += element_mastery_text + search_result + '\n';
              
          }
          channel.send(critical_text+'\n'+critical_hurt_text+'\n'+attack_text+'\n'+attack_num_text+'\n'+defense_text+'\n'+defense_num_text+'\n'+hp_text+'\n'+hp_num_text+'\n'+charge_efficiency_text+'\n'+element_mastery_text );
          //channel.send(orthopedics_text);
          
          let critical_value = critical*2+critical_hurt;
          let critical_attack_value = critical*2+critical_hurt+attack;
          let critical_defense_value = critical*2+critical_hurt+defense;
          let critical_charge_efficiency_value = critical*2+critical_hurt+charge_efficiency;
          let critical_hp_value = critical*2+critical_hurt+hp;
          let critical_element_mastery_value = critical*2+critical_hurt+(element_mastery*0.25);
          
          critical_value = Math.round(critical_value * 10) / 10;
          critical_attack_value = Math.round(critical_attack_value * 10) / 10;
          critical_defense_value = Math.round(critical_defense_value * 10) / 10;
          critical_charge_efficiency_value = Math.round(critical_charge_efficiency_value * 10) / 10;
          critical_hp_value = Math.round(critical_hp_value * 10) / 10;
          critical_element_mastery_value = Math.round(critical_element_mastery_value * 10) / 10;
          
          let critical_rank = '';
          let critical_attack_rank = '';
          let critical_defense_rank = '';
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
            if (critical_defense_value >= 50) {
                critical_defense_rank = '理論値';
            } else if (critical_defense_value >= 45) {
                critical_defense_rank = '厳選ランクS';
            } else if (critical_defense_value >= 40) {
                critical_defense_rank = '厳選ランクA';
            } else if (critical_defense_value >= 30) {
                critical_defense_rank = '厳選ランクB';
            } else if (critical_defense_value >= 20) {
                critical_defense_rank = '仮聖遺物';
            } else {
                critical_defense_rank = 'ゴミ';
            }
          } else if ((type_of_relics.includes('時の砂')) || (type_of_relics.includes('空の杯'))) {
            if (critical_defense_value >= 45) {
                critical_defense_rank = '理論値';
            } else if (critical_defense_value >= 40) {
                critical_defense_rank = '厳選ランクS';
            } else if (critical_defense_value >= 35) {
                critical_defense_rank = '厳選ランクA';
            } else if (critical_defense_value >= 25) {
                critical_defense_rank = '厳選ランクB';
            } else if (critical_defense_value >= 15) {
                critical_defense_rank = '仮聖遺物';
            } else {
                critical_defense_rank = 'ゴミ';
            }
          } else if ((type_of_relics.includes('理の冠'))) {
            if (critical_defense_value >= 40) {
                critical_defense_rank = '理論値';
            } else if (critical_defense_value >= 35) {
                critical_defense_rank = '厳選ランクS';
            } else if (critical_defense_value >= 30) {
                critical_defense_rank = '厳選ランクA';
            } else if (critical_defense_value >= 20) {
                critical_defense_rank = '厳選ランクB';
            } else if (critical_defense_value >= 10) {
                critical_defense_rank = '仮聖遺物';
            } else {
                critical_defense_rank = 'ゴミ';
            }
          }
          console.log(critical_defense_rank)
          
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
          
          
            embed.addField('聖遺物情報','【'+type_of_relics+'】\n'+orthopedics_text)
            data_collection.send({embeds: [embed] });
            //.addField('- スコア -','会心値 : '+(critical_value)+'\n会心+攻撃力値 : '+(critical_attack_value)+'\n会心+防御力値 : '+(critical_defense_value)+'\n会心+HP値 : '+(critical_hp_value)+'\n会心+元素ﾁｬｰｼﾞ効率値 : '+(critical_charge_efficiency_value)+'\n会心+元素熟知値 : '+(critical_element_mastery_value))
            embed.addField('- 会心 -',critical_rank+' ('+critical_value+')',true)
            embed.addField('- 会心+攻撃力% -',critical_attack_rank+' ('+critical_attack_value+')',true)
            embed.addField('- 会心+防御力% -',critical_defense_rank+' ('+critical_defense_value+')',true)
            embed.addField('- 会心+HP% -',critical_hp_rank+' ('+critical_hp_value+')',true)
            embed.addField('- 会心+元素ﾁｬｰｼﾞ効率 -',critical_charge_efficiency_rank+' ('+critical_charge_efficiency_value+')',true)
            embed.addField('- 会心+元素熟知 -',critical_element_mastery_rank+' ('+critical_element_mastery_value+')',true)
            embed.setDescription('<@'+message.author+'>')
          
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
