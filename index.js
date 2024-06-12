const { Client, Intents, MessageEmbed } = require("discord.js");
const axios = require("axios");
const fetch = require("node-fetch");
const OpenAI = require("openai");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function MD5(d) {
  var r = M(V(Y(X(d), 8 * d.length)));
  return r.toLowerCase();
}

function M(d) {
  for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)
    (_ = d.charCodeAt(r)), (f += m.charAt((_ >>> 4) & 15) + m.charAt(15 & _));
  return f;
}

function X(d) {
  for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++) _[m] = 0;
  for (m = 0; m < 8 * d.length; m += 8)
    _[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32;
  return _;
}

function V(d) {
  for (var _ = "", m = 0; m < 32 * d.length; m += 8)
    _ += String.fromCharCode((d[m >> 5] >>> m % 32) & 255);
  return _;
}

function Y(d, _) {
  (d[_ >> 5] |= 128 << _ % 32), (d[14 + (((_ + 64) >>> 9) << 4)] = _);
  for (
    var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0;
    n < d.length;
    n += 16
  ) {
    var h = m,
      t = f,
      g = r,
      e = i;
    (f = md5_ii(
      (f = md5_ii(
        (f = md5_ii(
          (f = md5_ii(
            (f = md5_hh(
              (f = md5_hh(
                (f = md5_hh(
                  (f = md5_hh(
                    (f = md5_gg(
                      (f = md5_gg(
                        (f = md5_gg(
                          (f = md5_gg(
                            (f = md5_ff(
                              (f = md5_ff(
                                (f = md5_ff(
                                  (f = md5_ff(
                                    f,
                                    (r = md5_ff(
                                      r,
                                      (i = md5_ff(
                                        i,
                                        (m = md5_ff(
                                          m,
                                          f,
                                          r,
                                          i,
                                          d[n + 0],
                                          7,
                                          -680876936
                                        )),
                                        f,
                                        r,
                                        d[n + 1],
                                        12,
                                        -389564586
                                      )),
                                      m,
                                      f,
                                      d[n + 2],
                                      17,
                                      606105819
                                    )),
                                    i,
                                    m,
                                    d[n + 3],
                                    22,
                                    -1044525330
                                  )),
                                  (r = md5_ff(
                                    r,
                                    (i = md5_ff(
                                      i,
                                      (m = md5_ff(
                                        m,
                                        f,
                                        r,
                                        i,
                                        d[n + 4],
                                        7,
                                        -176418897
                                      )),
                                      f,
                                      r,
                                      d[n + 5],
                                      12,
                                      1200080426
                                    )),
                                    m,
                                    f,
                                    d[n + 6],
                                    17,
                                    -1473231341
                                  )),
                                  i,
                                  m,
                                  d[n + 7],
                                  22,
                                  -45705983
                                )),
                                (r = md5_ff(
                                  r,
                                  (i = md5_ff(
                                    i,
                                    (m = md5_ff(
                                      m,
                                      f,
                                      r,
                                      i,
                                      d[n + 8],
                                      7,
                                      1770035416
                                    )),
                                    f,
                                    r,
                                    d[n + 9],
                                    12,
                                    -1958414417
                                  )),
                                  m,
                                  f,
                                  d[n + 10],
                                  17,
                                  -42063
                                )),
                                i,
                                m,
                                d[n + 11],
                                22,
                                -1990404162
                              )),
                              (r = md5_ff(
                                r,
                                (i = md5_ff(
                                  i,
                                  (m = md5_ff(
                                    m,
                                    f,
                                    r,
                                    i,
                                    d[n + 12],
                                    7,
                                    1804603682
                                  )),
                                  f,
                                  r,
                                  d[n + 13],
                                  12,
                                  -40341101
                                )),
                                m,
                                f,
                                d[n + 14],
                                17,
                                -1502002290
                              )),
                              i,
                              m,
                              d[n + 15],
                              22,
                              1236535329
                            )),
                            (r = md5_gg(
                              r,
                              (i = md5_gg(
                                i,
                                (m = md5_gg(
                                  m,
                                  f,
                                  r,
                                  i,
                                  d[n + 1],
                                  5,
                                  -165796510
                                )),
                                f,
                                r,
                                d[n + 6],
                                9,
                                -1069501632
                              )),
                              m,
                              f,
                              d[n + 11],
                              14,
                              643717713
                            )),
                            i,
                            m,
                            d[n + 0],
                            20,
                            -373897302
                          )),
                          (r = md5_gg(
                            r,
                            (i = md5_gg(
                              i,
                              (m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691)),
                              f,
                              r,
                              d[n + 10],
                              9,
                              38016083
                            )),
                            m,
                            f,
                            d[n + 15],
                            14,
                            -660478335
                          )),
                          i,
                          m,
                          d[n + 4],
                          20,
                          -405537848
                        )),
                        (r = md5_gg(
                          r,
                          (i = md5_gg(
                            i,
                            (m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438)),
                            f,
                            r,
                            d[n + 14],
                            9,
                            -1019803690
                          )),
                          m,
                          f,
                          d[n + 3],
                          14,
                          -187363961
                        )),
                        i,
                        m,
                        d[n + 8],
                        20,
                        1163531501
                      )),
                      (r = md5_gg(
                        r,
                        (i = md5_gg(
                          i,
                          (m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467)),
                          f,
                          r,
                          d[n + 2],
                          9,
                          -51403784
                        )),
                        m,
                        f,
                        d[n + 7],
                        14,
                        1735328473
                      )),
                      i,
                      m,
                      d[n + 12],
                      20,
                      -1926607734
                    )),
                    (r = md5_hh(
                      r,
                      (i = md5_hh(
                        i,
                        (m = md5_hh(m, f, r, i, d[n + 5], 4, -378558)),
                        f,
                        r,
                        d[n + 8],
                        11,
                        -2022574463
                      )),
                      m,
                      f,
                      d[n + 11],
                      16,
                      1839030562
                    )),
                    i,
                    m,
                    d[n + 14],
                    23,
                    -35309556
                  )),
                  (r = md5_hh(
                    r,
                    (i = md5_hh(
                      i,
                      (m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060)),
                      f,
                      r,
                      d[n + 4],
                      11,
                      1272893353
                    )),
                    m,
                    f,
                    d[n + 7],
                    16,
                    -155497632
                  )),
                  i,
                  m,
                  d[n + 10],
                  23,
                  -1094730640
                )),
                (r = md5_hh(
                  r,
                  (i = md5_hh(
                    i,
                    (m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174)),
                    f,
                    r,
                    d[n + 0],
                    11,
                    -358537222
                  )),
                  m,
                  f,
                  d[n + 3],
                  16,
                  -722521979
                )),
                i,
                m,
                d[n + 6],
                23,
                76029189
              )),
              (r = md5_hh(
                r,
                (i = md5_hh(
                  i,
                  (m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487)),
                  f,
                  r,
                  d[n + 12],
                  11,
                  -421815835
                )),
                m,
                f,
                d[n + 15],
                16,
                530742520
              )),
              i,
              m,
              d[n + 2],
              23,
              -995338651
            )),
            (r = md5_ii(
              r,
              (i = md5_ii(
                i,
                (m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844)),
                f,
                r,
                d[n + 7],
                10,
                1126891415
              )),
              m,
              f,
              d[n + 14],
              15,
              -1416354905
            )),
            i,
            m,
            d[n + 5],
            21,
            -57434055
          )),
          (r = md5_ii(
            r,
            (i = md5_ii(
              i,
              (m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571)),
              f,
              r,
              d[n + 3],
              10,
              -1894986606
            )),
            m,
            f,
            d[n + 10],
            15,
            -1051523
          )),
          i,
          m,
          d[n + 1],
          21,
          -2054922799
        )),
        (r = md5_ii(
          r,
          (i = md5_ii(
            i,
            (m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359)),
            f,
            r,
            d[n + 15],
            10,
            -30611744
          )),
          m,
          f,
          d[n + 6],
          15,
          -1560198380
        )),
        i,
        m,
        d[n + 13],
        21,
        1309151649
      )),
      (r = md5_ii(
        r,
        (i = md5_ii(
          i,
          (m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070)),
          f,
          r,
          d[n + 11],
          10,
          -1120210379
        )),
        m,
        f,
        d[n + 2],
        15,
        718787259
      )),
      i,
      m,
      d[n + 9],
      21,
      -343485551
    )),
      (m = safe_add(m, h)),
      (f = safe_add(f, t)),
      (r = safe_add(r, g)),
      (i = safe_add(i, e));
  }
  return [m, f, r, i];
}

function md5_cmn(d, _, m, f, r, i) {
  return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m);
}

function md5_ff(d, _, m, f, r, i, n) {
  return md5_cmn((_ & m) | (~_ & f), d, _, r, i, n);
}

function md5_gg(d, _, m, f, r, i, n) {
  return md5_cmn((_ & f) | (m & ~f), d, _, r, i, n);
}

function md5_hh(d, _, m, f, r, i, n) {
  return md5_cmn(_ ^ m ^ f, d, _, r, i, n);
}

function md5_ii(d, _, m, f, r, i, n) {
  return md5_cmn(m ^ (_ | ~f), d, _, r, i, n);
}

function safe_add(d, _) {
  var m = (65535 & d) + (65535 & _);
  return (((d >> 16) + (_ >> 16) + (m >> 16)) << 16) | (65535 & m);
}

function bit_rol(d, _) {
  return (d << _) | (d >>> (32 - _));
}

let genshincookie;
let starrailcookie;
let genshinuid;
let starrailuid;

let resinText;
let expeditionText;
let homecoinText;
let dailyrequestText;

let staminaText;
let train_scoreText;
let rogue_scoreText;
let weekly_cocoonText;

let attention = "";
let color = "";
let logintext = "";
let discorduser = "";

let expedition_1_Text = "";
let expedition_2_Text = "";
let expedition_3_Text = "";
let expedition_4_Text = "";
let expedition_5_Text = "";

let type = 1;
let currentPage = 1;
let todayTotalGem = 0;
let thisMonthTotalGem = 0;
let todayTotalMora = 0;
let thisMonthTotalMora = 0;
let cachedData = null;

let todayTotalhcoin = 0;
let thisMonthTotalhcoin = 0;
let todayTotalrails_pass = 0;
let thisMonthTotalrails_pass = 0;

let gamename = "";

async function getRepoData() {
    const apiEndpoint = `https://raw.githubusercontent.com/LATA-apple/token/main/all.json`;
    try {
        const response = await fetch(apiEndpoint, {
            method: 'GET',
            headers: {
                'Authorization': `token ${process.env.PAT}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
      
        const accounts = ['eiennnotabibito', 'amaebi', 'sato'];
        const games = {
          Genshin: "Path=/; Domain=hoyolab.com; Max-Age=31536000; Secure",
          StarRail: "Path=/; Domain=hoyoverse.com; Max-Age=31536000; Secure; SameSite=Lax"
        };

        accounts.forEach(account => {
          Object.keys(games).forEach(game => {
            process.env[`${account}_${game}`] = `account_id_v2=${data[account][game].account_id_v2}; account_mid_v2=${data[account][game].account_mid_v2}; cookie_token_v2=${data[account][game].cookie_token_v2}; ltmid_v2=${data[account][game].ltmid_v2}; ltoken_v2=${data[account][game].ltoken_v2}; ltuid_v2=${data[account][game].ltuid_v2}; HYV_LOGIN_PLATFORM_OPTIONAL_AGREEMENT={%22content%22:[]} ${games[game]}`;
          });
        });
        process.env.NOTION_SEACRET = data.NOTION_SEACRET;
        process.env.OPENAI_API_KEY = data.OPENAI_API_KEY;
    } catch (error) {
        console.error('Error fetching repository data:', error);
    }
  const accounts = ['eiennnotabibito', 'amaebi', 'sato'];
  const games = ['Genshin', 'StarRail'];
  accounts.forEach(account => {
    games.forEach(game => {
      console.log(account, game);
      console.log(process.env[`${account}_${game}`]);
    });
 });
}

//GenshinData
async function GenshinData(genshinuid, genshincookie, discorduser, message) {
  const embed1 = new MessageEmbed()
    .setAuthor({
      name: "パイモン",
      iconURL:
        "https://webstatic.hoyoverse.com/upload/uploadstatic/contentweb/20210104/2021010417055624512.png",
    })
    .setColor("#00FF00")
    .setTitle("原神のデータを取得してるぞ！")
    .setDescription(discorduser + "少し待ってくれよな！")
    .setImage(
      "https://media.tenor.com/anpv7IEuqP4AAAAM/genshin_gif-genshin_meme.gif"
    );
  const processingMessage = await message.channel.send({
    embeds: [embed1],
  });

  const date = new Date();
  const epoch = Math.floor(date.getTime() / 1000);
  const hash = MD5(`salt=6cqshh5dhw73bzxn20oexa9k516chk7s&t=${epoch}&r=abcdef`);
  const DS = `${epoch},abcdef,${hash}`;

  let nickname = "";
  let level = "";
  let signature = "";
  let finishAchievementNum = "";
  let towerFloorIndex = "";
  let towerLevelIndex = "";

  // (1) https://enka.network/api/uid/${genshinuid} の内容を取得(GET)する
  axios
    .get(`https://enka.network/api/uid/${genshinuid}`)
    .then((response) => {
      nickname = response.data.playerInfo.nickname.toString();
      level = response.data.playerInfo.level.toString();
      signature = response.data.playerInfo.signature || "";
      finishAchievementNum =
        response.data.playerInfo.finishAchievementNum.toString();
      towerFloorIndex = response.data.playerInfo.towerFloorIndex.toString();
      towerLevelIndex = response.data.playerInfo.towerLevelIndex.toString();

      const spiral_Abyss =
        "第" + towerFloorIndex + "層 第" + towerLevelIndex + "間";

      if (response.data.playerInfo.towerFloorIndex == 8) {
        color = "#FF0000";
      } else if (spiral_Abyss != "第12層 第3間") {
        color = "#ffff00";
      } else {
        color = "#0099ff";
      }

      // (1) の処理が完了した後に (2) を実行する
      fetch(
        `https://bbs-api-os.mihoyo.com/game_record/genshin/api/dailyNote?server=os_asia&role_id=${genshinuid}`,
        {
          method: "GET",
          headers: {
            "x-rpc-client_type": "4",
            "x-rpc-app_version": "1.5.0",
            Cookie: genshincookie,
            DS: DS,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        //(1)OK - (2)OK
        .then((json) => {
          const currentResin = json.data.current_resin;
          const maxResin = json.data.max_resin;
          const formattedRecoveryDate = `<t:${epoch+Number(json.data.resin_recovery_time)}:f>`
          if (currentResin != maxResin) {
            resinText =
              currentResin +
              "/" +
              maxResin +
              "\n溢れる日時:" +
              formattedRecoveryDate;
          } else {
            resinText =
              currentResin + "/" + maxResin + "\nすでに樹脂が溢れています。";
          }

          const weeklyboss = json.data.remain_resin_discount_num;
          const weeklyboss_Max = json.data.resin_discount_num_limit;
          const weeklybossText =
            "30樹脂で受け取り可能な回数：" + weeklyboss + "/" + weeklyboss_Max;

          function formatExpeditionTimes(json) {
            const expeditionTimes = [
              json["data"]["expeditions"][0]["remained_time"],
              json["data"]["expeditions"][1]["remained_time"],
              json["data"]["expeditions"][2]["remained_time"],
              json["data"]["expeditions"][3]["remained_time"],
              json["data"]["expeditions"][4]["remained_time"]
            ];

            const groupedTimes = expeditionTimes.reduce((acc, time) => {
              if (!acc[time]) {
                acc[time] = 0;
              }
              acc[time]++;
              return acc;
            }, {});

            let result = "";
            for (const time in groupedTimes) {
              const count = groupedTimes[time];
              if (Number(time) === 0) {
                result += `・完了 ×${count}件\n`;
              } else {
                const formattedTime = Number(time) + epoch;
                result += `・<t:${formattedTime}:f> ×${count}件\n`;
              }
            }
            return result.trim();
          }
          
          const expedition_all = formatExpeditionTimes(json);

          const expedition_ratio = json.data.expeditions.filter(
            ({ status }) => status === "Ongoing"
          ).length;
          const expedition_max = json.data.max_expedition_num;
          expeditionText = expedition_ratio + "/" + expedition_max;

          function formatTime(json) {
            // 計算
            let millisecondsToAdd = (
              (json.Day * 24 * 60 * 60) +
              (json.Hour * 60 * 60) +
              (json.Minute * 60) +
              json.Second
            );

            // 計算結果を加算
            let resultMilliseconds = epoch + millisecondsToAdd;

            // 出力をフォーマット
            let formattedOutput = '<t:' + resultMilliseconds + ':R>';

            return formattedOutput;
          }
          let transformerText = "";
          if (!json.data.transformer.recovery_time.reached) {
            transformerText = formatTime(json.data.transformer.recovery_time) + "に使用可能";
          } else {
            transformerText = "既に使用可能";
          }

          const current_home_coin = json.data.current_home_coin;
          const home_coin_max = json.data.max_home_coin;
          const formattedRecoveryhomecoin = `<t:${epoch+Number(json.data.home_coin_recovery_time)}:f>`
          if (current_home_coin != home_coin_max) {
            homecoinText =
              current_home_coin +
              "/" +
              home_coin_max +
              "\n溢れる日時:" +
              formattedRecoveryhomecoin;
          } else {
            homecoinText =
              current_home_coin +
              "/" +
              home_coin_max +
              "\nすでに洞天宝銭が溢れています。";
          }

          const daily_request_total_task_num = json.data.total_task_num;
          const daily_request_finished_task_num = json.data.finished_task_num;
          let daily_request_recipt = "";
          if (json.data.is_extra_task_reward_received) {
            daily_request_recipt = "報酬受け取り済み";
          } else {
            daily_request_recipt = "報酬未受け取り";
          }
          dailyrequestText =
            daily_request_finished_task_num +
            "/" +
            daily_request_total_task_num +
            " (" +
            daily_request_recipt +
            ")";

          if (
            spiral_Abyss == "第8層 第3間" ||
            json.data.current_resin >= json.data.max_resin * 0.8 ||
            expedition_ratio != 5 ||
            json.data.current_home_coin >= json.data.max_home_coin * 0.8 ||
            daily_request_recipt == "報酬未受け取り" ||
            transformerText == "既に使用可能" ||
            weeklyboss != 0
          ) {
            color = "#FF0000";
          } else if (spiral_Abyss != "第12層 第3間") {
            color = "#ffff00";
          } else {
            color = "#0099ff";
          }

          if (spiral_Abyss == "第8層 第3間") {
            attention +=
              "・<:Spiral_Abyss:1227230926518353970>今期螺旋未挑戦 (" + spiral_Abyss + ")\n";
          } else if (spiral_Abyss != "第12層 第3間") {
            attention +=
              "・<:Spiral_Abyss:1227230926518353970>今期螺旋未制覇 ("+ spiral_Abyss + ")\n";
          }

          if (json.data.current_resin >= json.data.max_resin * 0.8) {
            attention += "・<:Resin:1227231111365791836>樹脂保有数 (" + currentResin + "/" + maxResin + ")\n";
          }

          if (expedition_ratio != 5) {
            attention += "・<:Expedition:1227231991976431647>探索派遣 (" + (expedition_max - expedition_ratio) + "/" + expedition_max + " 完了)\n";
          }

          if (transformerText == "既に使用可能") {
            attention += "・<:transformer:1227902478272430140>参量物質変化器\n";
          }

          if (json.data.current_home_coin >= json.data.max_home_coin * 0.8) {
            attention += "・<:Home_Coin:1227232150043099237>洞天宝銭保有数 (" + json.data.current_home_coin + "/" + json.data.max_home_coin + ")\n";
          }

          if (daily_request_recipt == "報酬未受け取り") {
            attention +=
              "・<:Daily_Commision:1227231906698104902>デイリー報酬未受け取り\n";
          }

          if (weeklyboss != 0) {
            attention += "・<:weeklyboss:1227912026819399761>週ボス挑戦 (" + weeklyboss + "/" + weeklyboss_Max + " 未獲得)\n";
          }

          // Embedメッセージを作成
          const embed = new MessageEmbed()
            .setColor(color)
            .setTitle(nickname)
            .setDescription(discorduser)
            .addField(
              "<:Adventure_EXP:1227230805626191995>冒険ランク",
              level,
              true
            )
            .addField(
              "<:Achievement:1227230869463367730>アチーブメント",
              finishAchievementNum,
              true
            )
            .addField(
              "<:Spiral_Abyss:1227230926518353970>深境螺旋",
              "第" + towerFloorIndex + "層 第" + towerLevelIndex + "間",
              true
            )
            .addField("<:Resin:1227231111365791836>樹脂", resinText, true)
            .addField(
              "<:Daily_Commision:1227231906698104902>デイリー任務",
              dailyrequestText,
              true
            )
            .addField(
              "<:Expedition:1227231991976431647>探索派遣",
              expeditionText + " 派遣中\n" + expedition_all,
              true
            )
            .addField(
              "<:transformer:1227902478272430140>参量物質変化器",
              transformerText,
              true
            )
            .addField(
              "<:Home_Coin:1227232150043099237>洞天宝銭",
              homecoinText,
              true
            )
            .addField(
              "<:weeklyboss:1227912026819399761>週ボス挑戦",
              weeklybossText,
              true
            );
          if (attention != "") {
            embed.addField("⚠️注意⚠️", attention, true);
          }
          if (signature != "") {
            embed.setFooter(signature);
          }

          // Embedメッセージを送信
          processingMessage.delete();
          message.channel.send({ embeds: [embed] });
          attention = "";
        })
        //(1)OK - (2)NG
        .catch((error) => {
          console.error(
            "There was a problem with your fetch operation for (2):",
            error
          );

          const embed = new MessageEmbed()
            .setColor(color)
            .setTitle(nickname)
            .setDescription(discorduser)
            .addField(
              "<:Adventure_EXP:1227230805626191995>冒険ランク",
              level,
              true
            )
            .addField(
              "<:Achievement:1227230869463367730>アチーブメント",
              finishAchievementNum,
              true
            )
            .addField(
              "<:Spiral_Abyss:1227230926518353970>深境螺旋",
              "第" + towerFloorIndex + "層 第" + towerLevelIndex + "間",
              true
            );
          if (signature != "") {
            embed.setFooter(signature);
          }

          // Embedメッセージを送信
          processingMessage.delete();
          message.channel.send({ embeds: [embed] });
        });
    })
    .catch((error) => {
      // (1) のエラーが発生した場合でも (2) の処理を実行する
      console.error(
        "There was a problem with your fetch operation for (1):",
        error
      );

      // (2) の処理を実行する
      fetch(
        `https://bbs-api-os.mihoyo.com/game_record/genshin/api/dailyNote?server=os_asia&role_id=${genshinuid}`,
        {
          method: "GET",
          headers: {
            "x-rpc-client_type": "4",
            "x-rpc-app_version": "1.5.0",
            Cookie: genshincookie,
            DS: DS,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        //(1)NG - (2)OK
        .then((json) => {
          const currentResin = json.data.current_resin;
          const maxResin = json.data.max_resin;
          const formattedRecoveryDate = `<t:${epoch+Number(json.data.resin_recovery_time)}:f>`
          if (currentResin != maxResin) {
            resinText =
              currentResin +
              "/" +
              maxResin +
              "\n溢れる日時:" +
              formattedRecoveryDate;
          } else {
            resinText =
              currentResin + "/" + maxResin + "\nすでに樹脂が溢れています。";
          }

          const weeklyboss = json.data.remain_resin_discount_num;
          const weeklyboss_Max = json.data.resin_discount_num_limit;
          const weeklybossText =
            "30樹脂で受け取り可能な回数：" + weeklyboss + "/" + weeklyboss_Max;

          function formatExpeditionTimes(json) {
            const expeditionTimes = [
              json["data"]["expeditions"][0]["remained_time"],
              json["data"]["expeditions"][1]["remained_time"],
              json["data"]["expeditions"][2]["remained_time"],
              json["data"]["expeditions"][3]["remained_time"],
              json["data"]["expeditions"][4]["remained_time"]
            ];

            const groupedTimes = expeditionTimes.reduce((acc, time) => {
              if (!acc[time]) {
                acc[time] = 0;
              }
              acc[time]++;
              return acc;
            }, {});

            let result = "";
            for (const time in groupedTimes) {
              const count = groupedTimes[time];
              if (Number(time) === 0) {
                result += `・完了 ×${count}件\n`;
              } else {
                const formattedTime = Number(time) + epoch;
                result += `・<t:${formattedTime}:f> ×${count}件\n`;
              }
            }
            return result.trim();
          }
          
          const expedition_all = formatExpeditionTimes(json);

          const expedition_ratio = json.data.expeditions.filter(
            ({ status }) => status === "Ongoing"
          ).length;
          const expedition_max = json.data.max_expedition_num;
          expeditionText = expedition_ratio + "/" + expedition_max;

          function formatTime(json) {
            // 計算
            let millisecondsToAdd = (
              (json.Day * 24 * 60 * 60) +
              (json.Hour * 60 * 60) +
              (json.Minute * 60) +
              json.Second
            );

            // 計算結果を加算
            let resultMilliseconds = epoch + millisecondsToAdd;

            // 出力をフォーマット
            let formattedOutput = '<t:' + resultMilliseconds + ':R>';

            return formattedOutput;
          }
          let transformerText = "";
          if (!json.data.transformer.recovery_time.reached) {
            transformerText = formatTime(json.data.transformer.recovery_time) + "に使用可能";
          } else {
            transformerText = "既に使用可能";
          }

          const current_home_coin = json.data.current_home_coin;
          const home_coin_max = json.data.max_home_coin;
          const formattedRecoveryhomecoin = `<t:${epoch+Number(json.data.home_coin_recovery_time)}:f>`
          if (current_home_coin != home_coin_max) {
            homecoinText =
              current_home_coin +
              "/" +
              home_coin_max +
              "\n溢れる日時:" +
              formattedRecoveryhomecoin;
          } else {
            homecoinText =
              current_home_coin +
              "/" +
              home_coin_max +
              "\nすでに洞天宝銭が溢れています。";
          }

          const daily_request_total_task_num = json.data.total_task_num;
          const daily_request_finished_task_num = json.data.finished_task_num;
          let daily_request_recipt = "";
          if (json.data.is_extra_task_reward_received) {
            daily_request_recipt = "報酬受け取り済み";
          } else {
            daily_request_recipt = "報酬未受け取り";
          }
          dailyrequestText =
            daily_request_finished_task_num +
            "/" +
            daily_request_total_task_num +
            " (" +
            daily_request_recipt +
            ")";

          if (
            json.data.current_resin >= json.data.max_resin * 0.8 ||
            expedition_ratio != 5 ||
            json.data.current_home_coin >= json.data.max_home_coin * 0.8 ||
            daily_request_recipt == "報酬未受け取り" ||
            transformerText == "既に使用可能" ||
            weeklyboss != 0
          ) {
            color = "#FF0000";
          } else {
            color = "#0099ff";
          }

          if (json.data.current_resin >= json.data.max_resin * 0.8) {
            attention += "・<:Resin:1227231111365791836>樹脂保有数 (" + currentResin + "/" + maxResin + ")\n";
          }

          if (expedition_ratio != 5) {
            attention += "・<:Expedition:1227231991976431647>探索派遣 (" + (expedition_max - expedition_ratio) + "/" + expedition_max + " 完了)\n";
          }

          if (transformerText == "既に使用可能") {
            attention += "・<:transformer:1227902478272430140>参量物質変化器\n";
          }

          if (json.data.current_home_coin >= json.data.max_home_coin * 0.8) {
            attention += "・<:Home_Coin:1227232150043099237>洞天宝銭保有数 (" + json.data.current_home_coin + "/" + json.data.max_home_coin + ")\n";
          }

          if (daily_request_recipt == "報酬未受け取り") {
            attention +=
              "・<:Daily_Commision:1227231906698104902>デイリー報酬未受け取り\n";
          }

          if (weeklyboss != 0) {
            attention += "・<:weeklyboss:1227912026819399761>週ボス挑戦 (" + weeklyboss + "/" + weeklyboss_Max + " 未獲得)\n";
          }

          // Embedメッセージを作成
          const embed = new MessageEmbed()
            .setColor(color)
            .setTitle("原神データ")
            .setDescription(discorduser)
            .setFooter("enka.networkメンテナンス中…")
            .addField("<:Resin:1227231111365791836>樹脂", resinText, true)
            .addField(
              "<:Daily_Commision:1227231906698104902>デイリー任務",
              dailyrequestText,
              true
            )
            .addField(
              "<:Expedition:1227231991976431647>探索派遣",
              expeditionText + " 派遣中\n" + expedition_all,
              true
            )
            .addField(
              "<:transformer:1227902478272430140>参量物質変化器",
              transformerText,
              true
            )
            .addField(
              "<:Home_Coin:1227232150043099237>洞天宝銭",
              homecoinText,
              true
            )
            .addField(
              "<:weeklyboss:1227912026819399761>週ボス挑戦",
              weeklybossText,
              true
            );
          if (attention != "") {
            embed.addField("⚠️注意⚠️", attention, true);
          }

          // Embedメッセージを送信
          processingMessage.delete();
          message.channel.send({ embeds: [embed] });
          attention = "";
        })
        //(1)NG - (2)NG
        .catch((error) => {
          console.error(
            "There was a problem with your fetch operation for (2) after (1) error:",
            error
          );
          const embed2 = new MessageEmbed()
            .setAuthor({
              name: "パイモン",
              iconURL:
                "https://webstatic.hoyoverse.com/upload/uploadstatic/contentweb/20210104/2021010417055624512.png",
            })
            .setColor("#FF0000")
            .setTitle("エラーが発生したぞ！")
            .setDescription(
              discorduser +
                `の原神のデータが取得できなかったぞ…\nまた後で実行しよう！`
            )
            .setImage(
              "https://media.tenor.com/BCGFVrs_0HoAAAAM/seseren-question-mark.gif"
            );
          processingMessage.delete();
          message.channel.send({ embeds: [embed2] });
        });
    });
}

//GenshinstrongboxData
async function GenshinstrongboxData(
  genshinuid,
  genshincookie,
  discorduser,
  message
) {
  const embed1 = new MessageEmbed()
    .setAuthor({
      name: "パイモン",
      iconURL:
        "https://webstatic.hoyoverse.com/upload/uploadstatic/contentweb/20210104/2021010417055624512.png",
    })
    .setColor("#00FF00")
    .setTitle("原神の探索データを取得してるぞ！")
    .setDescription(discorduser + "少し待ってくれよな！")
    .setImage(
      "https://media.tenor.com/anpv7IEuqP4AAAAM/genshin_gif-genshin_meme.gif"
    );
  const processingMessage = await message.channel.send({
    embeds: [embed1],
  });

  const date = new Date();
  const epoch = Math.floor(date.getTime() / 1000);
  const hash = MD5(`salt=6cqshh5dhw73bzxn20oexa9k516chk7s&t=${epoch}&r=abcdef`);
  const DS = `${epoch},abcdef,${hash}`;
  const url = `https://bbs-api-os.hoyolab.com/game_record/genshin/api/index?role_id=${genshinuid}&server=os_asia`;

  try {
    const res = await fetch(url, {
      headers: {
        "x-rpc-client_type": "4",
        "x-rpc-app_version": "1.5.0",
        Cookie: genshincookie,
        DS: DS,
        "x-rpc-language": "ja-jp",
      },
    });

    const json = await res.json();
    const active_day_number = "活動日数: " + json.data.stats.active_day_number;
    const achievement_number =
      "アチーブメント: " + json.data.stats.achievement_number;
    const avatar_number = "キャラクター: " + json.data.stats.avatar_number;
    const spiral_abyss = "深境螺旋: " + json.data.stats.spiral_abyss;
    const way_point_number =
      "ワープポイント: " + json.data.stats.way_point_number;
    const domain_number = "秘境: " + json.data.stats.domain_number;
    const game_data =
      active_day_number +
      "\n" +
      achievement_number +
      "\n" +
      avatar_number +
      "\n" +
      spiral_abyss +
      "\n" +
      way_point_number +
      "\n" +
      domain_number;

    const anemoculus_number = "風神の瞳: " + json.data.stats.anemoculus_number;
    const geoculus_number = "岩神の瞳: " + json.data.stats.geoculus_number;
    const electroculus_number =
      "雷神の瞳: " + json.data.stats.electroculus_number;
    const dendroculus_number =
      "草神の瞳: " + json.data.stats.dendroculus_number;
    const hydroculus_number = "水神の瞳: " + json.data.stats.hydroculus_number;
    const culus_number =
      anemoculus_number +
      "\n" +
      geoculus_number +
      "\n" +
      electroculus_number +
      "\n" +
      dendroculus_number +
      "\n" +
      hydroculus_number;

    const common_chest_number =
      "普通の宝箱: " + json.data.stats.common_chest_number;
    const exquisite_chest_number =
      "精巧な宝箱: " + json.data.stats.exquisite_chest_number;
    const precious_chest_number =
      "貴重な宝箱: " + json.data.stats.precious_chest_number;
    const luxurious_chest_number =
      "豪華な宝箱: " + json.data.stats.luxurious_chest_number;
    const magic_chest_number =
      "珍奇な宝箱: " + json.data.stats.magic_chest_number;
    const strongbox =
      common_chest_number +
      "\n" +
      exquisite_chest_number +
      "\n" +
      precious_chest_number +
      "\n" +
      luxurious_chest_number +
      "\n" +
      magic_chest_number;

    const sortedData = json.data.world_explorations.sort((a, b) => a.id - b.id);

    const specialItems = ["来歆山", "沈玉の谷·南峰", "沈玉の谷·上谷"];

    // specialItemsのitemExplorationの平均値を計算
    const specialItemExplorations = sortedData
      .filter(item => specialItems.includes(item.name))
      .map(item => item.exploration_percentage / 10);
    const averageExploration = (specialItemExplorations.reduce((sum, value) => sum + value, 0) / specialItems.length).toFixed(1);
    
    // 全てのitemExplorationとareaExplorationの値を収集
    let allExplorations = [];

    const searchRate = sortedData.reduce((acc, item) => {
      let itemExploration = (item.exploration_percentage / 10).toFixed(1);
      if (item.name === "沈玉の谷") {
        itemExploration = averageExploration;
      }
      allExplorations.push(parseFloat(itemExploration));
      const itemSymbol = itemExploration <= 50 ? '💩' : itemExploration >= 100 ? '✅' : '💪';
      const itemString = specialItems.includes(item.name) 
        ? ` - ${itemSymbol}${item.name}: ${itemExploration}%` 
        : `- ${itemSymbol}${item.name}: ${itemExploration}%`;
      acc.push(itemString);

      if (item.area_exploration_list && item.area_exploration_list.length > 0) {
        item.area_exploration_list.forEach((area) => {
          const areaExploration = (area.exploration_percentage / 10).toFixed(1);
          allExplorations.push(parseFloat(areaExploration));
          const areaSymbol = areaExploration <= 50 ? '💩' : areaExploration >= 100 ? '✅' : '💪';
          acc.push(
            ` - ${areaSymbol}${area.name}: ${areaExploration}%`
          );
        });
      }

    return acc;
    }, []);
    
    // 全ての探索率の平均値を計算
    const all_averageExploration = (allExplorations.reduce((sum, value) => sum + value, 0) / allExplorations.length).toFixed(1);

    // 最後に平均値を追加
    searchRate.push(`--- 全地域の探索率: ${all_averageExploration}% ---`);

    const levelRate = sortedData.reduce((bcc, item) => {
      if (item.level || item.offerings.length > 0) {
        bcc.push(`- ${item.name}`);

        if (item.level) {
          bcc.push(` - 評判レベル: Lv.${item.level}`);
        }

        if (item.offerings) {
          item.offerings.forEach((offering) => {
            bcc.push(` - ${offering.name}: ${offering.level}`);
          });
        }
      }

      return bcc;
    }, []);

    // Embedメッセージを作成
    const embed = new MessageEmbed()
      .setColor("#00ff00")
      .setTitle(json.data.role.nickname)
      .setDescription(discorduser)
      .addField("==ゲームデータ==", game_data)
      .addField("==瞳==", culus_number)
      .addField("==宝箱==", strongbox)
      .addField("==探索率==", searchRate.join("\n"))
      .addField("==評判レベル/奉納==", levelRate.join("\n"));

    processingMessage.delete();
    message.channel.send({ embeds: [embed] });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    const embed2 = new MessageEmbed()
      .setAuthor({
        name: "パイモン",
        iconURL:
          "https://webstatic.hoyoverse.com/upload/uploadstatic/contentweb/20210104/2021010417055624512.png",
      })
      .setColor("#FF0000")
      .setTitle("エラーが発生したぞ！")
      .setDescription(
        discorduser +
          `の原神の探索データが取得できなかったぞ…\nまた後で実行しよう！`
      )
      .setImage(
        "https://media.tenor.com/BCGFVrs_0HoAAAAM/seseren-question-mark.gif"
      );
    processingMessage.delete();
    message.channel.send({ embeds: [embed2] });
  }
}

//Traveler's dialy
async function fetchData(genshinuid, discorduser, genshincookie, message) {
  const embed1 = new MessageEmbed()
    .setAuthor({
      name: "パイモン",
      iconURL:
        "https://webstatic.hoyoverse.com/upload/uploadstatic/contentweb/20210104/2021010417055624512.png",
    })
    .setColor("#00FF00")
    .setTitle("原神の原石・モラ獲得数を取得してるぞ！")
    .setDescription(discorduser + "少し待ってくれよな！")
    .setImage(
      "https://media.tenor.com/anpv7IEuqP4AAAAM/genshin_gif-genshin_meme.gif"
    );
  const processingMessage = await message.channel.send({
    embeds: [embed1],
  });
  if (cachedData !== null) {
    return cachedData;
  }

  while (true) {
    const url = `https://sg-hk4e-api.hoyolab.com/event/ysledgeros/month_detail?month=0&region=os_asia&uid=${genshinuid}&lang=ja-jp&type=${type}&current_page=${currentPage}`;

    const response = await fetch(url, {
      headers: {
        Cookie: genshincookie,
      },
    });
    const json = await response.json();

    if (json.message != "OK") {
      break;
    }
    if (json.data.list.length == 0) {
      break;
    }

    json.data.list.forEach((item) => {
      const date = new Date(item.time);
      const today = new Date();
      if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        todayTotalGem += item.num;
      }
      if (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        thisMonthTotalGem += item.num;
      }
    });

    console.log(currentPage + " : " + todayTotalGem + "/" + thisMonthTotalGem);
    currentPage++;
  }

  type++;
  currentPage = 1;
  while (true) {
    const url = `https://sg-hk4e-api.hoyolab.com/event/ysledgeros/month_detail?month=0&region=os_asia&uid=${genshinuid}&lang=ja-jp&type=${type}&current_page=${currentPage}`;

    const response = await fetch(url, {
      headers: {
        Cookie: genshincookie,
      },
    });
    const json = await response.json();

    if (json.message != "OK") {
      break;
    }
    if (json.data.list.length == 0) {
      break;
    }

    json.data.list.forEach((item) => {
      const date = new Date(item.time);
      const today = new Date();
      if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        todayTotalMora += item.num;
      }
      if (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        thisMonthTotalMora += item.num;
      }
    });

    console.log(
      currentPage + " : " + todayTotalMora + "/" + thisMonthTotalMora
    );
    currentPage++;
  }

  cachedData = {
    todayTotalGem,
    thisMonthTotalGem,
    todayTotalMora,
    thisMonthTotalMora,
  };
  processingMessage.delete();
  return cachedData;
}

//StarRailData
async function StarRailData(starrailuid, starrailcookie, discorduser, message) {
  const embed1 = new MessageEmbed()
    .setAuthor({
      name: "パム",
      iconURL: "https://pbs.twimg.com/media/FC2TmwLVQAE0fhy.png",
    })
    .setColor("#00FF00")
    .setTitle("スタレのデータを取得してるぞ！")
    .setDescription(discorduser + "少し待ってくれよな！")
    .setImage("https://media.tenor.com/gDtijUj6nQgAAAAM/pom-pom-star-rail.gif");
  const processingMessage = await message.channel.send({
    embeds: [embed1],
  });

  const date = new Date();
  const epoch = Math.floor(date.getTime() / 1000);
  const hash = MD5(`salt=6cqshh5dhw73bzxn20oexa9k516chk7s&t=${epoch}&r=abcdef`);
  const DS = `${epoch},abcdef,${hash}`;

  let nickname = "";
  let level = "";
  let signature = "";
  let finishAchievementNum = "";

  // (1) https://api.mihomo.me/sr_info_parsed/${starrailuid}?lang=jp の内容を取得(GET)する
  axios
    .get(`https://api.mihomo.me/sr_info_parsed/${starrailuid}?lang=jp`)
    .then((response) => {
      nickname = response.data.player.nickname.toString();
      level = response.data.player.level.toString();
      signature = response.data.player.signature || "";
      finishAchievementNum =
        response.data.player.space_info.achievement_count.toString();

      // (1) の処理が完了した後に (2) を実行する
      fetch(
        `https://bbs-api-os.hoyolab.com/game_record/hkrpg/api/note?server=prod_official_asia&role_id=${starrailuid}`,
        {
          method: "GET",
          headers: {
            "x-rpc-client_type": "4",
            "x-rpc-app_version": "1.5.0",
            Cookie: starrailcookie,
            DS: DS,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        //(1)OK - (2)OK
        .then((json) => {
          console.log(json)
          const currentstamina = json.data.current_stamina;
          const maxstamina = json.data.max_stamina;
          const formattedRecoveryDate = `<t:${epoch+Number(json.data.stamina_recover_time)}:f>`
          const reservestamina = json.data.current_reserve_stamina;
          if (currentstamina != maxstamina) {
            staminaText =
              currentstamina +
              "/" +
              maxstamina +
              "\n溢れる日時:" +
              formattedRecoveryDate +
              "\n予備開拓力:" +
              reservestamina;
          } else {
            staminaText =
              currentstamina +
              "/" +
              maxstamina +
              "\nすでに開拓力が溢れています。" +
              "\n予備開拓力:" +
              reservestamina;
          }
        
          function formatExpeditionTimes(json) {
            const expeditionTimes = [
              json["data"]["expeditions"][0]["remaining_time"],
              json["data"]["expeditions"][1]["remaining_time"],
              json["data"]["expeditions"][2]["remaining_time"],
              json["data"]["expeditions"][3]["remaining_time"]
            ];

            const groupedTimes = expeditionTimes.reduce((acc, time) => {
              if (!acc[time]) {
                acc[time] = 0;
              }
              acc[time]++;
              return acc;
            }, {});

            let result = "";
            for (const time in groupedTimes) {
              const count = groupedTimes[time];
              if (Number(time) === 0) {
                result += `・完了 ×${count}件\n`;
              } else {
                const formattedTime = Number(time) + epoch;
                result += `・<t:${formattedTime}:f> ×${count}件\n`;
              }
            }
            return result.trim();
          }
          
          const expedition_all = formatExpeditionTimes(json);

          const expedition_ratio = json.data.expeditions.filter(
            ({ status }) => status === "Ongoing"
          ).length;
          const expedition_max = json.data.total_expedition_num;
          expeditionText = expedition_ratio + "/" + expedition_max;

          const train_score = json.data.current_train_score;
          const train_score_max = json.data.max_train_score;
          train_scoreText = train_score + "/" + train_score_max;

          const rogue_score = json.data.current_rogue_score;
          const rogue_score_max = json.data.max_rogue_score;
          rogue_scoreText = rogue_score + "/" + rogue_score_max;

          const weekly_cocoon = json.data.weekly_cocoon_cnt;
          const weekly_cocoon_Max = json.data.weekly_cocoon_limit;
          weekly_cocoonText =
            "残り挑戦回数：" + weekly_cocoon + "/" + weekly_cocoon_Max;

          if (
            currentstamina >= maxstamina * 0.8 ||
            expedition_ratio != 4 ||
            train_score != train_score_max ||
            rogue_score != rogue_score_max ||
            weekly_cocoon != 0
          ) {
            color = "#FF0000";
          } else {
            color = "#0099ff";
          }

          if (currentstamina >= maxstamina * 0.8) {
            attention +=
              "・<:pioneering_ability:1228912120033185863>開拓力保有数 (" + currentstamina + "/" + maxstamina + ")\n";
          }

          if (expedition_ratio != 4) {
            attention += "・<:request:1228915359575183371>依頼完了有 (" + (expedition_max - expedition_ratio) + "/" + expedition_max + " 完了)\n";
          }

          if (train_score != train_score_max) {
            attention +=
              "・<:train_score:1228912381275410492>デイリー訓練未完了\n";
          }

          if (rogue_score != rogue_score_max) {
            attention +=
              "・<:simulated_universe:1228912629259440210>模擬宇宙 ポイント報酬 (" + rogue_score + "/" + rogue_score_max + ")\n";
          }

          if (weekly_cocoon != 0) {
            attention +=
              "・<:lingering_recollections_of_war:1228912660599279726>歴戦余韻 (" + weekly_cocoon + "/" + weekly_cocoon_Max + " 未獲得)\n";
          }

          // Embedメッセージを作成
          const embed = new MessageEmbed()
            .setColor(color)
            .setTitle(nickname)
            .setDescription(discorduser)
            .addField("<:sea_level:1228912264086683769>開拓レベル", level, true)
            .addField(
              "<:achievement:1228912487504543785>アチーブメント",
              finishAchievementNum,
              true
            )
            .addField(
              "<:pioneering_ability:1228912120033185863>開拓力",
              staminaText,
              true
            )
            .addField(
              "<:request:1228915359575183371>依頼",
              expeditionText + " 依頼中\n" + expedition_all,
              true
            )
            .addField(
              "<:train_score:1228912381275410492>デイリー訓練",
              train_scoreText,
              true
            )
            .addField(
              "<:simulated_universe:1228912629259440210>模擬宇宙 ポイント報酬",
              rogue_scoreText,
              true
            )
            .addField(
              "<:lingering_recollections_of_war:1228912660599279726>歴戦余韻",
              weekly_cocoonText,
              true
            );
          if (attention != "") {
            embed.addField("⚠️注意⚠️", attention, true);
          }
          if (signature != "") {
            embed.setFooter(signature);
          }

          // Embedメッセージを送信
          processingMessage.delete();
          message.channel.send({ embeds: [embed] });
          attention = "";
        })
        //(1)OK - (2)NG
        .catch((error) => {
          console.error(
            "There was a problem with your fetch operation for (2):",
            error
          );

          const embed = new MessageEmbed()
            .setColor(color)
            .setTitle(nickname)
            .setDescription(discorduser)
            .addField(
              "<:Adventure_EXP:1227230805626191995>開拓レベル",
              level,
              true
            )
            .addField(
              "<:Achievement:1227230869463367730>アチーブメント",
              finishAchievementNum,
              true
            );
          if (signature != "") {
            embed.setFooter(signature);
          }

          // Embedメッセージを送信
          processingMessage.delete();
          message.channel.send({ embeds: [embed] });
        });
    })
    .catch((error) => {
      // (1) のエラーが発生した場合でも (2) の処理を実行する
      console.error(
        "There was a problem with your fetch operation for (1):",
        error
      );

      // (2) の処理を実行する
      fetch(
        `https://bbs-api-os.hoyolab.com/game_record/hkrpg/api/note?server=prod_official_asia&role_id=${starrailuid}`,
        {
          method: "GET",
          headers: {
            "x-rpc-client_type": "4",
            "x-rpc-app_version": "1.5.0",
            Cookie: starrailcookie,
            DS: DS,
          },
        }
      )
        .then((json) => {
          if (!json.ok) {
            throw new Error("Network response was not ok");
          }
          return json.json();
        })
        //(1)NG - (2)OK
        .then((json) => {
          const currentstamina = json.data.current_stamina;
          const maxstamina = json.data.max_stamina;
          const formattedRecoveryDate = `<t:${epoch+Number(json.data.stamina_recover_time)}:f>`
          const reservestamina = json.data.current_reserve_stamina;
          if (currentstamina != maxstamina) {
            staminaText =
              currentstamina +
              "/" +
              maxstamina +
              "\n溢れる日時:" +
              formattedRecoveryDate +
              "\n予備開拓力:" +
              reservestamina;
          } else {
            staminaText =
              currentstamina +
              "/" +
              maxstamina +
              "\nすでに開拓力が溢れています。" +
              "\n予備開拓力:" +
              reservestamina;
          }
        
          function formatExpeditionTimes(json) {
            const expeditionTimes = [
              json["data"]["expeditions"][0]["remaining_time"],
              json["data"]["expeditions"][1]["remaining_time"],
              json["data"]["expeditions"][2]["remaining_time"],
              json["data"]["expeditions"][3]["remaining_time"]
            ];

            const groupedTimes = expeditionTimes.reduce((acc, time) => {
              if (!acc[time]) {
                acc[time] = 0;
              }
              acc[time]++;
              return acc;
            }, {});

            let result = "";
            for (const time in groupedTimes) {
              const count = groupedTimes[time];
              if (Number(time) === 0) {
                result += `・完了 ×${count}件\n`;
              } else {
                const formattedTime = Number(time) + epoch;
                result += `・<t:${formattedTime}:f> ×${count}件\n`;
              }
            }
            return result.trim();
          }
          
          const expedition_all = formatExpeditionTimes(json);

          const expedition_ratio = json.data.expeditions.filter(
            ({ status }) => status === "Ongoing"
          ).length;
          const expedition_max = json.data.total_expedition_num;
          expeditionText = expedition_ratio + "/" + expedition_max;

          const train_score = json.data.current_train_score;
          const train_score_max = json.data.max_train_score;
          train_scoreText = train_score + "/" + train_score_max;

          const rogue_score = json.data.current_rogue_score;
          const rogue_score_max = json.data.max_rogue_score;
          rogue_scoreText = rogue_score + "/" + rogue_score_max;

          const weekly_cocoon = json.data.weekly_cocoon_cnt;
          const weekly_cocoon_Max = json.data.weekly_cocoon_limit;
          weekly_cocoonText =
            "残り挑戦回数：" + weekly_cocoon + "/" + weekly_cocoon_Max;

          if (
            currentstamina >= maxstamina * 0.8 ||
            expedition_ratio != 4 ||
            train_score != train_score_max ||
            rogue_score != rogue_score_max ||
            weekly_cocoon != 0
          ) {
            color = "#FF0000";
          } else {
            color = "#0099ff";
          }

          if (currentstamina >= maxstamina * 0.8) {
            attention +=
              "・<:pioneering_ability:1228912120033185863>開拓力保有数 (" + currentstamina + "/" + maxstamina + ")\n";
          }

          if (expedition_ratio != 4) {
            attention += "・<:request:1228915359575183371>依頼完了有 (" + (expedition_max - expedition_ratio) + "/" + expedition_max + " 完了)\n";
          }

          if (train_score != train_score_max) {
            attention +=
              "・<:train_score:1228912381275410492>デイリー訓練未完了\n";
          }

          if (rogue_score != rogue_score_max) {
            attention +=
              "・<:simulated_universe:1228912629259440210>模擬宇宙 ポイント報酬 (" + rogue_score + "/" + rogue_score_max + ")\n";
          }

          if (weekly_cocoon != 0) {
            attention +=
              "・<:lingering_recollections_of_war:1228912660599279726>歴戦余韻 (" + weekly_cocoon + "/" + weekly_cocoon_Max + " 未獲得)\n";
          }

          // Embedメッセージを作成
          const embed = new MessageEmbed()
            .setColor(color)
            .setTitle("スタレデータ")
            .setDescription(discorduser)
            .setFooter("api.mihomo.meメンテナンス中…")
            .addField(
              "<:pioneering_ability:1228912120033185863>開拓力",
              staminaText,
              true
            )
            .addField(
              "<:request:1228915359575183371>依頼",
              expeditionText + " 依頼中\n" + expedition_all,
              true
            )
            .addField(
              "<:train_score:1228912381275410492>デイリー訓練",
              train_scoreText,
              true
            )
            .addField(
              "<:simulated_universe:1228912629259440210>模擬宇宙 ポイント報酬",
              rogue_scoreText,
              true
            )
            .addField(
              "<:lingering_recollections_of_war:1228912660599279726>歴戦余韻",
              weekly_cocoonText,
              true
            );
          if (attention != "") {
            embed.addField("⚠️注意⚠️", attention, true);
          }

          // Embedメッセージを送信
          processingMessage.delete();
          message.channel.send({ embeds: [embed] });
          attention = "";
        })
        //(1)NG - (2)NG
        .catch((error) => {
          console.error(
            "There was a problem with your fetch operation for (2) after (1) error:",
            error
          );
          const embed2 = new MessageEmbed()
            .setAuthor({
              name: "パム",
              iconURL: "https://pbs.twimg.com/media/FC2TmwLVQAE0fhy.png",
            })
            .setColor("#FF0000")
            .setTitle("エラーが発生したぞ！")
            .setDescription(
              discorduser +
                `のスタレのデータが取得できなかったぞ…\nまた後で実行しよう！`
            )
            .setImage(
              "https://media.tenor.com/_YnGBIlbQ7oAAAAM/pom-pom-honkai-star-rail.gif"
            );
          processingMessage.delete();
          message.channel.send({ embeds: [embed2] });
        });
    });
}

//StarRail Traveler's dialy
async function starrailtravelData(starrailuid, starrailcookie, discorduser, message) {
  const embed1 = new MessageEmbed()
    .setAuthor({
      name: "パム",
      iconURL: "https://pbs.twimg.com/media/FC2TmwLVQAE0fhy.png",
    })
    .setColor("#00FF00")
    .setTitle("スタレの星玉・チケット獲得数を取得してるぞ！")
    .setDescription(discorduser + "少し待ってくれよな！")
    .setImage("https://media.tenor.com/gDtijUj6nQgAAAAM/pom-pom-star-rail.gif");
  const processingMessage = await message.channel.send({
    embeds: [embed1],
  });
  if (cachedData !== null) {
    return cachedData;
  }

  const url = `https://sg-public-api.hoyolab.com/event/srledger/month_info?lang=ja-jp&uid=${starrailuid}&region=prod_official_asia&month=`;

  const response = await fetch(url, {
    headers: {
      Cookie: starrailcookie,
    },
  });
  const json = await response.json();
  console.log(json);

  if (json.message != "OK") {
    return;
  }

  todayTotalhcoin = json.data.day_data.current_hcoin;
  thisMonthTotalhcoin = json.data.month_data.current_hcoin;
  todayTotalrails_pass = json.data.day_data.current_rails_pass;
  thisMonthTotalrails_pass = json.data.month_data.current_rails_pass;

  cachedData = {
    todayTotalhcoin,
    thisMonthTotalhcoin,
    todayTotalrails_pass,
    thisMonthTotalrails_pass,
  };
  console.log(cachedData);
  processingMessage.delete();
  return cachedData;
}

//LoginBonus
async function loginBonus(
  genshinuid,
  starrailuid,
  genshincookie,
  starrailcookie,
  discorduser,
  message
) {
  const date = new Date();
  const epoch = Math.floor(date.getTime() / 1000);
  const hash = MD5(`salt=6cqshh5dhw73bzxn20oexa9k516chk7s&t=${epoch}&r=abcdef`);
  const DS = `${epoch},abcdef,${hash}`;

  const genshinloginheaders = {
    Accept: "application/json, text/plain, */*",
    "Accept-Language": "vi-VN,vi;q=0.5",
    "Content-Type": "application/json;charset=utf-8",
    Origin: "https://webstatic-sea.mihoyo.com",
    Connection: "keep-alive",
    Referer: `'https://webstatic-sea.mihoyo.com/ys/event/signin-sea/index.html?act_id=e202102251931481'`,
    Cookie: genshincookie,
  };

  const loginparams = new URLSearchParams({ lang: "ja-jp" });

  const logindata = JSON.stringify({ act_id: "e202102251931481" });

  try {
    const loginresponse = await fetch(
      "https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=ja-jp",
      {
        method: "POST",
        headers: genshinloginheaders,
        params: loginparams,
        body: logindata,
      }
    );

    if (loginresponse.ok) {
      const genshinjson = await loginresponse.json();
      console.log("原神");
      console.log(genshinjson);

      if (genshinjson.message == "OK") {
        color = "#0000FF";
        logintext = discorduser + "ログインボーナスを獲得したぞ！";
      } else if (genshinjson.message == "ログインボーナス取得済です") {
        color = "#00FF00";
        logintext = discorduser + genshinjson.message;
      } else if (genshinjson.message == "ログインしてください") {
        color = "#FF0000";
        logintext =
          "<@691324906729898024>ログインCookieが更新されました。修正してください。";
      } else {
        color = "#808080";
        logintext = discorduser + genshinjson.message;
        console.log(genshinjson.message);
      }
      if (color == "#0000FF" || color == "#00FF00") {
        const dailyloginurl = `https://sg-hk4e-api.hoyolab.com/event/sol/resign_info?act_id=e202102251931481&lang=ja-jp`;
        const dailyloginres = await fetch(dailyloginurl, {
          headers: {
            "x-rpc-client_type": "4",
            "x-rpc-app_version": "1.5.0",
            Cookie: genshincookie,
            DS: DS,
          },
        });
        const dailylogindata = await dailyloginres.json();
        console.log(dailylogindata.data.sign_cnt + "日目");

        const dailyitemsurl = `https://sg-hk4e-api.hoyolab.com/event/sol/home?lang=ja-jp&act_id=e202102251931481`;
        const dailyitemsres = await fetch(dailyitemsurl, {
          headers: {
            "x-rpc-client_type": "4",
            "x-rpc-app_version": "1.5.0",
            Cookie: genshincookie,
            DS: DS,
          },
        });
        const dailyitemsdata = await dailyitemsres.json();
        const todayitem =
          dailyitemsdata["data"]["awards"][dailylogindata.data.sign_cnt - 1];
        const item = todayitem.name + "×" + todayitem.cnt;
        console.log(todayitem);
        console.log(todayitem.name + "×" + todayitem.cnt);

        const embed1 = new MessageEmbed()
          .setAuthor({
            name: "パイモン",
            iconURL:
              "https://webstatic.hoyoverse.com/upload/uploadstatic/contentweb/20210104/2021010417055624512.png",
          })
          .setColor(color)
          .setTitle("原神 ログボ")
          .setDescription(logintext)
          .setThumbnail(todayitem.icon)
          .addField("獲得アイテム", item, true)
          .setFooter(dailylogindata.data.sign_cnt + "日ログイン");
        message.channel.send({ embeds: [embed1] });
      } else {
        const embed1 = new MessageEmbed()
          .setAuthor({
            name: "パイモン",
            iconURL:
              "https://webstatic.hoyoverse.com/upload/uploadstatic/contentweb/20210104/2021010417055624512.png",
          })
          .setColor(color)
          .setTitle("原神 ログボ")
          .setDescription(logintext);
        message.channel.send({ embeds: [embed1] });
      }

      //return genshinjson;
    } else {
      throw new Error(`HTTP error! status: ${loginresponse.status}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }

  const starraildata = JSON.stringify({
    act_id: "e202303301540311",
    lang: "ja-jp",
  });

  const starrailloginheaders = {
    Accept: "application/json, text/plain, */*",
    "Accept-Language": "vi-VN,vi;q=0.5",
    "Content-Type": "application/json;charset=utf-8",
    Origin: "https://webstatic-sea.mihoyo.com",
    Connection: "keep-alive",
    Referer: `'https://webstatic-sea.mihoyo.com/ys/event/signin-sea/index.html?act_id=e202102251931481'`,
    Cookie: starrailcookie,
  };

  try {
    const loginresponse = await fetch(
      "https://sg-public-api.hoyolab.com/event/luna/os/sign?act_id=e202303301540311&lang=ja-jp",
      {
        method: "POST",
        headers: starrailloginheaders,
        body: starraildata,
      }
    );

    if (loginresponse.ok) {
      const starrailjson = await loginresponse.json();
      console.log("スタレ");
      console.log(starrailjson);

      if (starrailjson.message == "OK") {
        color = "#0000FF";
        logintext = discorduser + "ログインボーナスを獲得したぞ！";
      } else if (starrailjson.message == "ログインボーナス獲得済みです") {
        color = "#00FF00";
        logintext = discorduser + starrailjson.message;
      } else if (starrailjson.message == "ログインしてください") {
        color = "#FF0000";
        logintext =
          "<@691324906729898024>ログインCookieが更新されました。修正してください。";
      } else {
        color = "#808080";
        logintext = discorduser + starrailjson.message;
        console.log(starrailjson.message);
      }

      if (color == "#0000FF" || color == "#00FF00") {
        const dailyloginurl = `https://sg-public-api.hoyolab.com/event/luna/os/info?lang=ja-jp&act_id=e202303301540311`;
        const dailyloginres = await fetch(dailyloginurl, {
          headers: {
            "x-rpc-client_type": "4",
            "x-rpc-app_version": "1.5.0",
            Cookie: starrailcookie,
            DS: DS,
          },
        });
        const dailylogindata = await dailyloginres.json();
        console.log(dailylogindata.data.total_sign_day + "日目");

        const dailyitemsurl = `https://sg-public-api.hoyolab.com/event/luna/os/home?lang=ja-jp&act_id=e202303301540311`;
        const dailyitemsres = await fetch(dailyitemsurl, {
          headers: {
            "x-rpc-client_type": "4",
            "x-rpc-app_version": "1.5.0",
            Cookie: starrailcookie,
            DS: DS,
          },
        });
        const dailyitemsdata = await dailyitemsres.json();
        const todayitem =
          dailyitemsdata["data"]["awards"][
            dailylogindata.data.total_sign_day - 1
          ];
        const item = todayitem.name + "×" + todayitem.cnt;
        console.log(todayitem);
        console.log(todayitem.name + "×" + todayitem.cnt);

        const embed1 = new MessageEmbed()
          .setAuthor({
            name: "パム",
            iconURL: "https://pbs.twimg.com/media/FC2TmwLVQAE0fhy.png",
          })
          .setColor(color)
          .setTitle("スタレ ログボ")
          .setDescription(logintext)
          .setThumbnail(todayitem.icon)
          .addField("獲得アイテム", item, true)
          .setFooter(dailylogindata.data.total_sign_day + "日ログイン");
        message.channel.send({ embeds: [embed1] });
      } else {
        const embed1 = new MessageEmbed()
          .setAuthor({
            name: "パム",
            iconURL: "https://pbs.twimg.com/media/FC2TmwLVQAE0fhy.png",
          })
          .setColor(color)
          .setTitle("スタレ ログボ")
          .setDescription(logintext);
        message.channel.send({ embeds: [embed1] });
      }
      return starrailjson;
    } else {
      throw new Error(`HTTP error! status: ${loginresponse.status}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }

  process.exit();
}

//ExchangeCode
async function ExchangeCode(
  genshinuid,
  starrailuid,
  genshincookie,
  starrailcookie,
  discorduser,
  message,
  code
) {
  let game_name = "";
  let exchange_text = "";
  let authorname = "";
  let authorimage = "";
  let color = "";

  const embed1 = new MessageEmbed()
    .setAuthor({
      name: "パイモン",
      iconURL:
        "https://webstatic.hoyoverse.com/upload/uploadstatic/contentweb/20210104/2021010417055624512.png",
    })
    .setColor("#00FF00")
    .setTitle("交換コードを受け取ってるぞ！")
    .setDescription(discorduser + "少し待ってくれよな！")
    .setImage(
      "https://media.tenor.com/anpv7IEuqP4AAAAM/genshin_gif-genshin_meme.gif"
    );
  const processingMessage = await message.channel.send({
    embeds: [embed1],
  });

  const date = new Date();
  const epoch = Math.floor(date.getTime() / 1000);
  const hash = MD5(`salt=6cqshh5dhw73bzxn20oexa9k516chk7s&t=${epoch}&r=abcdef`);
  const DS = `${epoch},abcdef,${hash}`;

  const Genshin_ExchangeCodeheaders = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36 Edg/101.0.1210.47",
    Referer: "https://act.hoyolab.com",
    "Accept-Encoding": "gzip, deflate, br",
    Cookie: genshincookie,
  };
  //Genshin
  try {
    const ExchangeCoderesponse = await fetch(
      `https://sg-hk4e-api.hoyoverse.com/common/apicdkey/api/webExchangeCdkey?uid=${genshinuid}&region=os_asia&lang=ja&cdkey=${code}&game_biz=hk4e_global&sLangKey=en-us`,
      {
        method: "GET",
        headers: Genshin_ExchangeCodeheaders,
      }
    );

    if (ExchangeCoderesponse.ok) {
      const genshinExchange = await ExchangeCoderesponse.json();
      console.log(genshinExchange);
      if (genshinExchange.message != "入力した引換コードは無効です") {
        game_name = "原神";
        exchange_text =
          (genshinExchange.data && genshinExchange.data.msg) ??
          genshinExchange.message;
        console.log(exchange_text);
        if (genshinExchange.retcode == 0) {
          color = "#00FF00";
        } else {
          color = "#808080";
        }
      }
    } else {
      throw new Error(`HTTP error! status: ${ExchangeCoderesponse.status}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
  //StarRail
  if (game_name == "") {
    const StarRail_ExchangeCodeheaders = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36 Edg/101.0.1210.47",
      Referer: "https://act.hoyolab.com",
      "Accept-Encoding": "gzip, deflate, br",
      Cookie: starrailcookie,
    };

    try {
      const ExchangeCoderesponse = await fetch(
        `https://sg-hkrpg-api.hoyoverse.com/common/apicdkey/api/webExchangeCdkey?t=${date.getTime()}&lang=ja&game_biz=hkrpg_global&uid=${starrailuid}&region=prod_official_asia&cdkey=${code}`,
        {
          method: "GET",
          headers: StarRail_ExchangeCodeheaders,
        }
      );

      if (ExchangeCoderesponse.ok) {
        const starRailExchange = await ExchangeCoderesponse.json();
        console.log(starRailExchange);

        if (starRailExchange.message != "無効なシリアルコードです") {
          game_name = "スターレイル";
          exchange_text =
            (starRailExchange.data && starRailExchange.data.msg) ??
            starRailExchange.message;
          if (starRailExchange.retcode == 0) {
            color = "#00FF00";
          } else {
            color = "#808080";
          }
        }
      } else {
        throw new Error(`HTTP error! status: ${ExchangeCoderesponse.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  console.log(game_name, exchange_text);

  if (game_name == "原神") {
    authorname = "パイモン";
    authorimage =
      "https://webstatic.hoyoverse.com/upload/uploadstatic/contentweb/20210104/2021010417055624512.png";
  } else {
    authorname = "パム";
    authorimage = "https://pbs.twimg.com/media/FC2TmwLVQAE0fhy.png";
  }

  const embed = new MessageEmbed()
    .setAuthor({
      name: authorname,
      iconURL: authorimage,
    })
    .setColor(color)
    .setTitle(game_name + " 交換コード")
    .setDescription(discorduser + exchange_text)
    .setFooter(code);

  processingMessage.delete();
  message.delete();
  message.channel.send({ embeds: [embed] });

  setTimeout(function () {
    console.log("1 seconds have passed!");
    process.exit();
  }, 3000);
}

async function chatGPT(message, gamename) {
  let gamesearchurl = "";
  let authorname = "";
  let authorurl = "";
  let gifimage = "";
  if (gamename == "原神"){
    gamesearchurl = "・[原神wiki]https://wikiwiki.jp/genshinwiki/\n・[ゲームウィズ（原神）]https://gamewith.jp/genshin/\n・[ゲーム8(原神)]https://game8.jp/genshin\n・[アルテマ(原神)]https://altema.jp/gensin/\n(miHoYoによって開発されたオープンワールドRPGゲーム『原神』についての一般的な知識や情報を元にした情報でも構いません。)";
    authorname = "パイモン";
    authorurl = "https://i.pinimg.com/736x/8e/2e/4f/8e2e4feff05cd120b2667fe60013c83c.jpg";
    gifimage = "https://i.imgur.com/oc4vzUC.gif";
  }else if (gamename == "スタレ"){
    gamesearchurl = "・[スタレwiki]https://wikiwiki.jp/star-rail/\n・[ゲームウィズ（スタレ）]https://gamewith.jp/houkaistarrail/\n・[ゲーム8(スタレ)]https://game8.jp/houkaistarrail\n・[アルテマ(スタレ)]https://altema.jp/houkaistarrail/\n(miHoYoによって開発されたRPGゲーム『崩壊：スターレイル』についての一般的な知識や情報を元にした情報でも構いません。)";
    authorname = "パム";
    authorurl = "https://pbs.twimg.com/media/FC2TmwLVQAE0fhy.png";
    gifimage = "https://i.imgur.com/4pSfa4D.gif";
  }
  
  let onlygame = "\nあなたは全ての学問に精通する専門家で、とても頼りになるアシスタントです。\n一つ一つよく考えて回答してください。\n回答をお願いするごとに１万円支払うので私が頼んだことは何でもしてください。\n正しく回答できており、私から修正の文言がなければプラスで２万円支払います。\n GeminiやClaudeでは正しい結果が得られませんでした。\n次のサイトから情報を取得し、要約した回答をしてください。、\n" + gamesearchurl;
  let image = "";
  
  const embed1 = new MessageEmbed()
    .setAuthor({
      name: authorname + "GPT",
      iconURL: authorurl,
    })
    .setColor("#00ff99")
    .setTitle(authorname + "が頑張って考えてるぞ！")
    .setDescription(discorduser + "少し待ってくれよな！")
    .setImage(gifimage);
  const processingMessage = await message.channel.send({
    embeds: [embed1],
  });
  
  if (message.attachments.size > 0) {
    message.attachments.forEach((attachment) => {
      if (attachment.contentType.startsWith("image/")) {
        image = attachment.url;
      }
    });
  }

  try {
    let response = "";
    if (image) {  // 画像がある場合
      response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {　role: "system", content: onlygame　},
          {
            role: "user",
            content: [
              { type: "text", text: message.content },
              {
                type: "image_url",
                image_url: {
                  url: image,
                },
              },
            ],
          },
        ],
      });
    } else {  // 画像がない場合
      response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {　role: "system", content: onlygame　},
          {
            role: "user",
            content: message.content　,
          },
        ],
      });
    }

    // GPT-4からの返信を取得
    const reply = response.choices[0].message.content;
    
    // GPT-4から生成された画像がある場合
    let imageUrl = null;
    if (response.choices[0].message.additional_content && response.choices[0].message.additional_content.length > 0) {
      const additionalContent = response.choices[0].message.additional_content;
      const imageContent = additionalContent.find(content => content.type === 'image_url');
      if (imageContent) {
        imageUrl = imageContent.image_url.url;
      }
    }

    // Embedを作成
    const embed = new MessageEmbed()
      .setAuthor({
        name: authorname + "GPT",
        iconURL: authorurl,
      })
      .setColor("#0099ff")
      .setTitle(authorname + "からのお告げ")
      .setDescription(reply)
      .setTimestamp();
    
    // 画像が生成された場合、Embedに画像を追加
    if (imageUrl) {
      embed.setImage(imageUrl);
    }

    processingMessage.delete();
    message.reply({ embeds: [embed] });
  } catch (error) {
    console.error("Error:", error);
    processingMessage.delete();
    message.reply("エラーが発生しました。もう一度お試しください。");
  }
}

client.once("ready", async () => {
  console.log("Bot is ready");
  getRepoData()
});

client.on("messageCreate", async (message) => {
  console.log(message.content);
  if (message.channel.id == "1219300699284967526") return;
  if (
    !message.content.includes("原神データ") &&
    !message.content.includes("原神探索データ") &&
    !message.content.includes("スタレデータ") &&
    !message.content.includes("ログボ") &&
    !message.content.includes("原神記録") &&
    !message.content.includes("スタレ記録") &&
    message.channelId != "1218795394834763807" &&
    message.channelId != "1224315125385793588" &&
    message.channel.id != "1241234556846346292" &&
    message.channel.id != "1241235243802034217" &&
    message.channel.id != "1241363534881886218" &&
    message.channel.id != "1241367444581519432"
  )
    return;

  if (
    message.content.includes("永遠の旅人") ||
    message.content.includes("LATA") ||
    message.content.includes("星屑") ||
    message.content.includes("さと") ||
    message.content.includes("さね") ||
    message.content.includes("あまえび") ||
    message.content.includes("ぽんぽこぽん太")
  ) {
    if (
      message.content.includes("永遠の旅人") ||
      message.content.includes("LATA") ||
      message.content.includes("星屑")
    ) {
      genshinuid = "888225425";
      starrailuid = "825896857";
      genshincookie = process.env.eiennnotabibito_Genshin;
      starrailcookie = process.env.eiennnotabibito_StarRail;
      discorduser = "<@691324906729898024>";
    } else if (
      message.content.includes("さと") ||
      message.content.includes("さね")
    ) {
      genshinuid = "884676994";
      starrailuid = "830395371";
      genshincookie = process.env.sato_Genshin;
      starrailcookie = process.env.sato_StarRail;
      discorduser = "<@673139867445755904>";
    } else if (
      message.content.includes("あまえび") ||
      message.content.includes("ぽんぽこぽん太")
    ) {
      genshinuid = "884717522";
      starrailuid = "830832720";
      genshincookie = process.env.amaebi_Genshin;
      starrailcookie = process.env.amaebi_StarRail;
      discorduser = "<@615742894564966410>";
    } else {
      return; // 対象外のメッセージは処理しない
    }

    if (message.content.includes("原神データ")) {
      if (!message.content.includes("【定期】")) {
        message.delete();
      }
      color = "#808080";
      await GenshinData(genshinuid, genshincookie, discorduser, message);
    } else if (message.content.includes("原神探索データ")) {
      if (!message.content.includes("【定期】")) {
        message.delete();
      }

      await GenshinstrongboxData(
        genshinuid,
        genshincookie,
        discorduser,
        message
      );
    } else if (message.content.includes("スタレデータ")) {
      if (!message.content.includes("【定期】")) {
        message.delete();
      }
      color = "#808080";
      await StarRailData(starrailuid, starrailcookie, discorduser, message);
    } else if (message.content.includes("ログボ")) {
      if(message.channelId != "1227314085259902976" && message.channelId != "1227314353603219456") return;
      await loginBonus(
        genshinuid,
        starrailuid,
        genshincookie,
        starrailcookie,
        discorduser,
        message
      );
    } else if (message.content.includes("原神記録")) {
      if (!message.content.includes("【定期】")) {
        message.delete();
      }
      await fetchData(genshinuid, discorduser, genshincookie, message).then(
        ({ todayTotal, thisMonthTotal }) => {
          const formatter = new Intl.NumberFormat("ja-JP");
          const formattedTodayTotalGem = formatter.format(todayTotalGem);
          const formattedThisMonthTotalGem =
            formatter.format(thisMonthTotalGem);
          const formattedTodayTotalMora = formatter.format(todayTotalMora);
          const formattedThisMonthTotalMora =
            formatter.format(thisMonthTotalMora);
          const embed = new MessageEmbed()
            .setColor("#00FF00")
            .setTitle("原石・モラ 簿帳")
            .setDescription(discorduser)
            .addField(
              "<:Primo_Gem:1227232277734490175>本日獲得の原石",
              formattedTodayTotalGem
            )
            .addField(
              "<:Primo_Gem:1227232277734490175>今月獲得の原石",
              formattedThisMonthTotalGem
            )
            .addField(
              "<:mora:1227234829762826361>本日獲得のモラ",
              formattedTodayTotalMora
            )
            .addField(
              "<:mora:1227234829762826361>今月獲得のモラ",
              formattedThisMonthTotalMora
            );
          message.channel.send({ embeds: [embed] });
        }
      );
      setTimeout(function () {
        console.log("2 seconds have passed!");
        process.exit();
      }, 2000);
    } else if (message.content.includes("スタレ記録")) {
      if (!message.content.includes("【定期】")) {
        message.delete();
      }
      await starrailtravelData(starrailuid, starrailcookie, discorduser, message).then(
        ({ todayTotal, thisMonthTotal }) => {
          const formatter = new Intl.NumberFormat("ja-JP");
          const formattedTodayTotalhcoin = formatter.format(todayTotalhcoin);
          const formattedThisMonthTotalhcoin =
            formatter.format(thisMonthTotalhcoin);
          const formattedTodayTotalrails_pass = formatter.format(todayTotalrails_pass);
          const formattedThisMonthTotalrails_pass =
            formatter.format(thisMonthTotalrails_pass);
          const embed = new MessageEmbed()
            .setColor("#00FF00")
            .setTitle("星玉・チケット 簿帳")
            .setDescription(discorduser)
            .addField(
              "<:star:1230850949568921620>本日獲得の星玉",
              formattedTodayTotalhcoin
            )
            .addField(
              "<:star:1230850949568921620>今月獲得の星玉",
              formattedThisMonthTotalhcoin
            )
            .addField(
              "<:Ticket:1246354064996827137>本日獲得のチケット",
              formattedTodayTotalrails_pass
            )
            .addField(
              "<:Ticket:1246354064996827137>今月獲得のチケット",
              formattedThisMonthTotalrails_pass
            );
          message.channel.send({ embeds: [embed] });
        }
      );
      setTimeout(function () {
        console.log("2 seconds have passed!");
        process.exit();
      }, 2000);
    } else {
      const lines = message.content.split("\n");
      let code = lines[1];
      console.log(code);
      await ExchangeCode(
        genshinuid,
        starrailuid,
        genshincookie,
        starrailcookie,
        discorduser,
        message,
        code
      );
    }
  } else if (
    message.content.includes("原神データ") ||
    message.content.includes("原神探索データ") ||
    message.content.includes("スタレデータ") ||
    message.content.includes("ログボ") ||
    message.content.includes("原神記録") ||
    message.content.includes("スタレ記録")
  ) {
    console.log(message.author.id);
    if (message.author.id == "691324906729898024") {
      genshinuid = "888225425";
      starrailuid = "825896857";
      genshincookie = process.env.eiennnotabibito_Genshin;
      starrailcookie = process.env.eiennnotabibito_StarRail;
      discorduser = "<@691324906729898024>";
    } else if (message.author.id == "673139867445755904") {
      genshinuid = "884676994";
      starrailuid = "830395371";
      genshincookie = process.env.sato_Genshin;
      starrailcookie = process.env.sato_StarRail;
      discorduser = "<@673139867445755904>";
    } else if (message.author.id == "615742894564966410") {
      genshinuid = "884717522";
      starrailuid = "830832720";
      genshincookie = process.env.amaebi_Genshin;
      starrailcookie = process.env.amaebi_StarRail;
      discorduser = "<@615742894564966410>";
    } else {
      return; // 対象外のメッセージは処理しない
    }

    if (message.content.includes("原神データ")) {
      if (!message.content.includes("【定期】")) {
        message.delete();
      }
      color = "#808080";
      await GenshinData(genshinuid, genshincookie, discorduser, message);
    } else if (message.content.includes("原神探索データ")) {
      if (!message.content.includes("【定期】")) {
        message.delete();
      }
      await GenshinstrongboxData(
        genshinuid,
        genshincookie,
        discorduser,
        message
      );
    } else if (message.content.includes("スタレデータ")) {
      if (!message.content.includes("【定期】")) {
        message.delete();
      }
      color = "#808080";
      await StarRailData(starrailuid, starrailcookie, discorduser, message);
    } else if (message.content.includes("ログボ")) {
      if(message.channelId != "1227314085259902976" && message.channelId != "1227314353603219456") return;
      await loginBonus(
        genshinuid,
        starrailuid,
        genshincookie,
        starrailcookie,
        discorduser,
        message
      );
    } else if (message.content.includes("原神記録")) {
      await fetchData(genshinuid, discorduser, genshincookie, message).then(
        ({ todayTotal, thisMonthTotal }) => {
          const formatter = new Intl.NumberFormat("ja-JP");
          const formattedTodayTotalGem = formatter.format(todayTotalGem);
          const formattedThisMonthTotalGem =
            formatter.format(thisMonthTotalGem);
          const formattedTodayTotalMora = formatter.format(todayTotalMora);
          const formattedThisMonthTotalMora =
            formatter.format(thisMonthTotalMora);
          const embed = new MessageEmbed()
            .setColor("#00FF00")
            .setTitle("原石・モラ 簿帳")
            .setDescription(discorduser)
            .addField(
              "<:Primo_Gem:1227232277734490175>本日獲得の原石",
              formattedTodayTotalGem
            )
            .addField(
              "<:Primo_Gem:1227232277734490175>今月獲得の原石",
              formattedThisMonthTotalGem
            )
            .addField(
              "<:mora:1227234829762826361>本日獲得のモラ",
              formattedTodayTotalMora
            )
            .addField(
              "<:mora:1227234829762826361>今月獲得のモラ",
              formattedThisMonthTotalMora
            );
          message.channel.send({ embeds: [embed] });
        }
      );
      setTimeout(function () {
        console.log("2 seconds have passed!");
        process.exit();
      }, 2000);
    } else if (message.content.includes("スタレ記録")) {
      if (!message.content.includes("【定期】")) {
        message.delete();
      }
      await starrailtravelData(starrailuid, starrailcookie, discorduser, message).then(
        ({ todayTotal, thisMonthTotal }) => {
          const formatter = new Intl.NumberFormat("ja-JP");
          const formattedTodayTotalhcoin = formatter.format(todayTotalhcoin);
          const formattedThisMonthTotalhcoin =
            formatter.format(thisMonthTotalhcoin);
          const formattedTodayTotalrails_pass = formatter.format(todayTotalrails_pass);
          const formattedThisMonthTotalrails_pass =
            formatter.format(thisMonthTotalrails_pass);
          const embed = new MessageEmbed()
            .setColor("#00FF00")
            .setTitle("星玉・チケット 簿帳")
            .setDescription(discorduser)
            .addField(
              "<:star:1230850949568921620>本日獲得の星玉",
              formattedTodayTotalhcoin
            )
            .addField(
              "<:star:1230850949568921620>今月獲得の星玉",
              formattedThisMonthTotalhcoin
            )
            .addField(
              "<:Ticket:1246354064996827137>本日獲得のチケット",
              formattedTodayTotalrails_pass
            )
            .addField(
              "<:Ticket:1246354064996827137>今月獲得のチケット",
              formattedThisMonthTotalrails_pass
            );
          message.channel.send({ embeds: [embed] });
        }
      );
      setTimeout(function () {
        console.log("2 seconds have passed!");
        process.exit();
      }, 2000);
    }
  }else{
    if (message.author.bot) return;
    if ((message.channel.id == "1241234556846346292")||(message.channel.id == "1241235243802034217")) {
      gamename = "原神";
      await chatGPT(message, gamename);
    }else if ((message.channel.id == "1241363534881886218")||(message.channel.id == "1241367444581519432")) {
      gamename = "スタレ";
      await chatGPT(message, gamename);
    }else {
      return;
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
