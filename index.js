const { Client, Intents } = require("discord.js");
const { createWorker } = require('tesseract.js');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log(`==== Logged in: ${client.user.tag} ====`);
  console.log('Bot is ready!');
  client.user.setPresence({ activity: { name: "げーむ" } });
});

const messageReplies = {
    //星5
    "ナヴィア":"\n【メインステータス】\n時の砂：攻撃力\n空の杯：岩ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心ダメージ/会心率/攻撃力\n普：元素チャージ効率",
    "荒瀧一斗":"\n【メインステータス】\n時の：防御力\n空の杯：岩ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心ダメージ/会心率/防御力\n普：元素チャージ効率/攻撃力",
    "主人公(岩)":"\n【メインステータス】\n時の砂：攻撃%\n空の杯：岩ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：元素チャージ効率/会心ダメージ/会心率\n普：攻撃力",
    "アルベド":"\n【メインステータス】\n時の砂：防御力\n空の杯：岩ダメ\n理の冠：会心率/会心ダメ/防御力\n【サブステータス】\n良：会心ダメージ/会心率/防御力\n普：攻撃力",
    "鍾離":"\n【メインステータス】\n時の砂：攻撃力%/チャージ/HP%\n空の杯：会心率/会心ダメ\n理の冠：会心率/会心ダメ/防御力\n【サブステータス】\n良：会心ダメージ/会心率/元素チャージ効率\n普：攻撃力/HP",
    "珊瑚宮心海":"\n【メインステータス】\n時の砂：HP/元素熟知\n空の杯：HP/水ダメ\n理の冠：治癒効果\n【サブステータス】\n良：HP/元素熟知\n普：攻撃力/元素チャージ効率",
    "主人公(水)":"\n【メインステータス】\n時の砂：HP\n空の杯：水ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：HP/会心率/会心ダメ/攻撃力\n普：元素チャージ効率/元素熟知",
    "フリーナ":"\n【メインステータス】\n時の砂：HP/元素チャージ効率\n空の杯：HP/水ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/HP\n普：元素チャージ効率/元素熟知",
    "ヌヴィレット":"\n【メインステータス】\n時の砂：HP\n空の杯：水ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/HP\n普：元素チャージ効率/元素熟知",
    "ニィロウ":"\n【メインステータス】\n時の砂：HP\n空の杯：HP\n理の冠：HP\n【サブステータス】\n良：HP/元素熟知\n普：会心率/会心ダメ/元素チャージ効率",
    "夜蘭":"\n【メインステータス】\n時の砂：HP/元素チャージ効率\n空の杯：水ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/HP/元素熟知\n普：元素熟知",
    "神里綾人":"\n【メインステータス】\n時の砂：攻撃力\n空の杯：水ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力\n普：HP/元素チャージ効率/元素熟知",
    "タルタリヤ":"\n【メインステータス】\n時の砂：攻撃力\n空の杯：水ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力\n普：元素チャージ効率/元素熟知",
    "モナ":"\n【メインステータス】\n時の砂：元素チャージ効率\n空の杯：水ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/元素チャージ効率\n普：元素熟知/攻撃力",
    "七七":"\n【メインステータス】\n時の砂：攻撃力\n空の杯：攻撃力\n理の冠：治療効果\n【サブステータス】\n良：攻撃力/元素チャージ効率\n普：会心率/会心ダメ",
    "甘雨":"\n【メインステータス】\n時の砂：攻撃力/元素熟知\n空の杯：氷ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力/元素熟知\n普：元素チャージ効率",
    "リオセスリ":"\n【メインステータス】\n時の砂：攻撃力\n空の杯：氷ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力\n普：元素チャージ効率/元素熟知",
    "申鶴":"\n【メインステータス】\n時の砂：攻撃力\n空の杯：攻撃力\n理の冠：攻撃力\n【サブステータス】\n良：攻撃力/元素チャージ効率\n普：会心率/会心ダメ",
    "アーロイ":"\n【メインステータス】\n時の砂：攻撃力\n空の杯：氷ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ\n普：攻撃力/元素チャージ効率/元素熟知",
    "エウルア":"\n【メインステータス】\n時の砂：攻撃力\n空の杯：物理ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力\n普：元素チャージ効率",
    "神里綾華":"\n【メインステータス】\n時の砂：攻撃力\n空の杯：氷ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力\n普：元素チャージ効率/元素熟知",
    "リネ":"\n【メインステータス】\n時の砂：攻撃力\n空の杯：炎ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力\n普：元素チャージ効率/元素熟知",
    "胡桃":"\n【メインステータス】\n時の砂：HP/元素熟知\n空の杯：炎ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/HP/元素熟知\n普：攻撃力/元素チャージ効率",
    "クレー":"\n【メインステータス】\n時の砂：攻撃力\n空の杯：炎ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力\n普：元素チャージ効率/元素熟知",
    "ディシア":"\n【メインステータス】\n時の砂：攻撃力/HP\n空の杯：炎ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力/HP\n普：元素チャージ効率/元素熟知",
    "ディルック":"\n【メインステータス】\n時の砂：攻撃力\n空の杯：炎ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力\n普：元素チャージ効率/元素熟知",
    "宵宮":"\n【メインステータス】\n時の砂：攻撃力\n空の杯：炎ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力\n普：元素熟知",
    "アルハイゼン":"\n【メインステータス】\n時の砂：攻撃力/元素熟知\n空の杯：草ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：元素熟知/会心率/会心ダメ/攻撃力\n普：元素チャージ効率",
    "ナヒーダ":"\n【メインステータス】\n時の砂：元素熟知\n空の杯：草ダメ/元素熟知\n理の冠：会心率/元素熟知\n【サブステータス】\n良：元素熟知/会心率/会心ダメ\n普：攻撃力/元素チャージ効率",
    "ティナリ":"\n【メインステータス】\n時の砂：元素熟知\n空の杯：草ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力/元素熟知\n普：元素チャージ効率",
    "主人公(草)":"\n【メインステータス】\n時の砂：元素チャージ効率/元素熟知\n空の杯：草ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：元素チャージ効率/会心率/会心ダメ\n普：攻撃力/元素熟知",
    "白朮":"\n【メインステータス】\n時の砂：元素チャージ効率/HP\n空の杯：HP\n理の冠：HP\n【サブステータス】\n良：HP/元素チャージ効率\n普：元素熟知/攻撃力/会心率/会心ダメ",
    "雷電将軍":"\n【メインステータス】\n時の砂：チャージ\n空の杯：攻撃力/雷ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：元素チャージ効率/会心率/会心ダメ\n普：攻撃力/元素熟知",
    "セノ":"\n【メインステータス】\n時の砂：元素熟知/攻撃力\n空の杯：雷ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/元素熟知/攻撃力\n普：元素チャージ効率",
    "主人公(雷)":"\n【メインステータス】\n時の砂：元素チャージ効率/元素熟知\n空の杯：雷ダメ/元素熟知\n理の冠：会心率/会心ダメ/元素熟知\n【サブステータス】\n良：会心率/会心ダメ/元素チャージ効率/元素熟知\n普：攻撃力",
    "刻晴":"\n【メインステータス】\n時の砂：攻撃力/元素熟知\n空の杯：雷ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力\n普：元素チャージ効率/元素熟知",
    "八重神子":"\n【メインステータス】\n時の砂：攻撃力/元素熟知\n空の杯：雷ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力/元素熟知\n普：元素チャージ効率",
    "放浪者":"\n【メインステータス】\n時の砂：攻撃力\n空の杯：風ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力\n普：元素チャージ効率/元素熟知",
    "ジン":"\n【メインステータス】\n時の砂：元素チャージ効率/元素熟知/攻撃力\n空の杯：風ダメ/元素熟知/攻撃力\n理の冠：会心率/会心ダメ/元素熟知\n【サブステータス】\n良：攻撃力/元素チャージ効率\n普：元素熟知/会心率/会心ダメ",
    "主人公(風)":"\n【メインステータス】\n時の砂：攻撃力\n空の杯：風ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：元素熟知/会心率/会心ダメ/攻撃力\n普：元素チャージ効率",
    "ウェンティ":"\n【メインステータス】\n時の砂：攻撃力/元素熟知\n空の杯：風ダメ/元素熟知\n理の冠：会心率/会心ダメ/元素熟知\n【サブステータス】\n良：元素熟知/攻撃力\n普：会心率/会心ダメ/元素チャージ効率",
    "楓原万葉":"\n【メインステータス】\n時の砂：元素熟知\n空の杯：元素熟知\n理の冠：元素熟知\n【サブステータス】\n良：元素熟知/元素チャージ効率\n普：会心率/会心ダメ/攻撃力",
    "魈":"\n【メインステータス】\n時の砂：攻撃力\n空の杯：風ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力\n普：元素チャージ効率",
    "閑雲":"\n【メインステータス】\n時の砂：攻撃力/元素チャージ効率\n空の杯：攻撃力\n理の冠：攻撃力\n【サブステータス】\n良：攻撃力/元素チャージ効率\n普：会心率/会心ダメ",
    //星4
    "凝光":"\n【メインステータス】\n時の砂：攻撃力\n空の杯：岩ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力\n普：元素チャージ効率",
    "ゴロー":"\n【メインステータス】\n時の砂：防御力/元素チャージ効率\n空の杯：防御力/岩ダメ\n理の冠：会心率/防御力\n【サブステータス】\n良：元素チャージ効率/防御力\n普：会心率/会心ダメ",
    "雲菫":"\n【メインステータス】\n時の砂：防御力/元素チャージ効率\n空の杯：防御力\n理の冠：防御力\n【サブステータス】\n良：元素チャージ効率/防御力\n普：会心率/会心ダメ",
    "ノエル":"\n【メインステータス】\n時の砂：防御力\n空の杯：岩ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：防御力/会心率/会心ダメ\n普：攻撃力/元素チャージ効率",
    "行秋":"\n【メインステータス】\n時の砂：元素チャージ効率\n空の杯：水ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/元素チャージ効率\n普：攻撃力/元素熟知",
    "バーバラ":"\n【メインステータス】\n時の砂：HP\n空の杯：HP\n理の冠：治療効果\n【サブステータス】\n良：HP/元素チャージ効率\n普：防御力",
    "キャンディス":"\n【メインステータス】\n時の砂：HP/元素チャージ効率\n空の杯：HP\n理の冠：HP/会心率\n【サブステータス】\n良：HP/元素チャージ効率\n普：攻撃力/元素熟知/会心率/会心ダメ",
    "ロサリア":"\n【メインステータス】\n時の砂：攻撃力/元素チャージ効率\n空の杯：氷ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力\n普：元素チャージ効率/元素熟知",
    "ディオナ":"\n【メインステータス】\n時の砂：HP/元素チャージ効率\n空の杯：HP\n理の冠：HP\n【サブステータス】\n良：HP/元素チャージ効率\n普：防御力",
    "ガイア":"\n【メインステータス】\n時の砂：攻撃力\n空の杯：氷ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力\n普：元素チャージ効率",
    "ミカ":"\n【メインステータス】\n時の砂：HP/元素チャージ効率\n空の杯：HP\n理の冠：治療効果/会心率\n【サブステータス】\n良：HP/元素チャージ効率/会心率\n普：会心ダメ/攻撃力",
    "レイラ":"\n【メインステータス】\n時の砂：HP\n空の杯：HP\n理の冠：HP\n【サブステータス】\n良：HP/会心率/会心ダメ\n普：攻撃力/元素チャージ効率",
    "シャルロット":"\n【メインステータス】\n時の砂：攻撃力/元素チャージ効率\n空の杯：攻撃力/氷ダメ\n理の冠：会心率/会心ダメ/治療効果\n【サブステータス】\n良：会心率/会心ダメ/攻撃力\n普：元素チャージ効率/元素熟知",
    "フレミネ":"\n【メインステータス】\n時の砂：攻撃力\n空の杯：物理ダメ/氷ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力\n普：元素チャージ効率/元素熟知",
    "重雲":"\n【メインステータス】\n時の砂：攻撃力/元素熟知\n空の杯：氷ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力/元素熟知\n普：元素チャージ効率",
    "トーマ":"\n【メインステータス】\n時の砂：HP/元素チャージ効率\n空の杯：HP/元素熟知\n理の冠：HP/元素熟知\n【サブステータス】\n良：HP/元素チャージ効率/元素熟知\n普：会心率/会心ダメ/攻撃力",
    "シュヴルーズ":"\n【メインステータス】\n時の砂：HP\n空の杯：HP\n理の冠：HP\n【サブステータス】\n良：HP/会心率/会心ダメ/攻撃力\n普：元素チャージ効率/元素熟知",
    "香菱":"\n【メインステータス】\n時の砂：攻撃力/元素チャージ効率\n空の杯：炎ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/v\n普：攻撃力/元素熟知",
    "辛炎":"\n【メインステータス】\n時の砂：攻撃力/防御力\n空の杯：物理ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力/防御力\n普：元素チャージ効率",
    "アンバー":"\n【メインステータス】\n時の砂：攻撃力\n空の杯：炎ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力/元素チャージ効率\n普：元素熟知",
    "煙緋":"\n【メインステータス】\n時の砂：攻撃力\n空の杯：炎ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力\n普：元素チャージ効率/元素熟知",
    "ベネット":"\n【メインステータス】\n時の砂：元素チャージ効率\n空の杯：HP\n理の冠：HP/治療効果\n【サブステータス】\n良：HP/元素チャージ効率\n普：会心率/会心ダメ/元素熟知",
    "嘉明":"\n【メインステータス】\n時の砂：攻撃力\n空の杯：炎ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力\n普：元素チャージ効率/元素熟知",
    "綺良々":"\n【メインステータス】\n時の砂：HP\n空の杯：HP\n理の冠：HP\n【サブステータス】\n良：HP/攻撃力/会心率/会心ダメ\n普：元素チャージ効率/元素熟知",
    "ヨォーヨ":"\n【メインステータス】\n時の砂：HP/元素チャージ効率\n空の杯：HP\n理の冠：治療効果/HP\n【サブステータス】\n良：HP/元素チャージ効率\n普：元素熟知/会心率/会心ダメ/攻撃力",
    "カーヴェ":"\n【メインステータス】\n時の砂：元素チャージ効率/元素熟知\n空の杯：元素熟知\n理の冠：元素熟知\n【サブステータス】\n良：元素チャージ効率/元素熟知\n普：攻撃力/会心率/会心ダメ/HP",
    "コレイ":"\n【メインステータス】\n時の砂：攻撃力/元素チャージ効率/元素熟知\n空の杯：草ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力/元素チャージ効率\n普：元素熟知",
    "レザー":"\n【メインステータス】\n時の砂：攻撃力/元素熟知\n空の杯：物理ダメ/元素熟知\n理の冠：会心率/会心ダメ/元素熟知\n【サブステータス】\n良：会心率/会心ダメ/攻撃力\n普：元素チャージ効率/元素熟知",
    "北斗":"\n【メインステータス】\n時の砂：攻撃力/元素チャージ効率\n空の杯：雷ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/元素チャージ効率\n普：攻撃力/元素熟知",
    "フィッシュル":"\n【メインステータス】\n時の砂：攻撃力/元素熟知\n空の杯：雷ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力\n普：元素チャージ効率/元素熟知",
    "ドリー":"\n【メインステータス】\n時の砂：元素チャージ効率\n空の杯：HP\n理の冠：治療効果\n【サブステータス】\n良：HP/元素チャージ効率\n普：会心率/会心ダメ/攻撃力/元素熟知",
    "久岐忍":"\n【メインステータス】\n時の砂：元素熟知\n空の杯：元素熟知\n理の冠：元素熟知\n【サブステータス】\n良：HP/元素熟知\n普：会心率/会心ダメ/攻撃力/元素チャージ効率",
    "リサ":"\n【メインステータス】\n時の砂：攻撃力\n空の杯：雷ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ\n普：攻撃力/元素チャージ効率/元素熟知",
    "九条裟羅":"\n【メインステータス】\n時の砂：元素チャージ効率\n空の杯：雷ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：元素チャージ効率\n普：会心率/会心ダメ/攻撃力",
    "ファルザン":"\n【メインステータス】\n時の砂：元素チャージ効率\n空の杯：風ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：元素チャージ効率/会心率/攻撃力\n普：会心ダメ/元素熟知",
    "鹿野院平蔵":"\n【メインステータス】\n時の砂：攻撃力\n空の杯：風ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：会心率/会心ダメ/攻撃力\n普：元素熟知",
    "スクロース":"\n【メインステータス】\n時の砂：元素熟知\n空の杯：元素熟知\n理の冠：元素熟知\n【サブステータス】\n良：元素チャージ効率/元素熟知\n普：会心率/会心ダメ/攻撃力",
    "リネット":"\n【メインステータス】\n時の砂：元素チャージ効率\n空の杯：風ダメ\n理の冠：会心率/会心ダメ\n【サブステータス】\n良：元素チャージ効率/会心率/会心ダメ/攻撃力\n普：元素熟知",
    "早柚":"\n【メインステータス】\n時の砂：元素熟知/攻撃力/元素チャージ効率\n空の杯：元素熟知/攻撃力\n理の冠：元素熟知/治療効果\n【サブステータス】\n良：元素熟知/攻撃力\n普：元素チャージ効率/会心率/会心ダメ"
};

const messageReplies1 = {
    //星5
    "ナヴィア":"\n🟠裁断\n🟠葦海の標\n🟠狼の末路\n🟣無工の剣\n🟣螭龍の剣\n🟣祭礼の大剣\n🟣タイダル・シャドー",
    "荒瀧一斗":"\n🟠赤角石塵滅砕\n🟣白影の剣\n🟠天空の傲\n🟣螭龍の剣\n🔵鉄影段平",
    "主人公(岩)":"\n🟠天空の刃\n🟣祭礼の剣\n🟠磐岩結緑\n🟣西風剣\n🟣腐植の剣\n🟠霧切の廻光\n🟣サーンドルの渡し守",
    "アルベド":"\n🟣シナバースピンドル\n🔵黎明の神剣\n🟣狼牙\n🟠磐岩結緑",
    "鍾離":"\n🟣西風長槍\n🔵黒纓槍\n🟣正義の報酬",
    "珊瑚宮心海":"\n🔵龍殺しの英傑譚\n🟣祭礼の断片\n🟠千夜に浮かぶ夢\n🟠不滅の月華\n🟣金珀・試作",
    "主人公(水)":"\n🟠磐岩結緑\n🟣腐植の剣\n🟣サーンドルの渡し守\n🟣海淵のフィナーレ\n🟣狼牙\n🟣祭礼の剣",
    "フリーナ":"\n🟠静水流転の輝き\n🟠磐岩結緑\n🟣腐植の剣\n🟠聖顕の鍵\n🟣サーンドルの渡し守\n🟣西風剣",
    "ヌヴィレット":"\n🟠久遠流転の大典\n🟣古祠の瓏\n🟠四風原典\n🟣流浪楽章\n🟣金珀・試作",
    "ニィロウ":"\n🟠聖顕の鍵\n🟣船渠剣\n🟠蒼古なる自由への誓い\n🟣サイフォスの月明かり\n🟠磐岩結緑\n🟣鉄蜂の刺し",
    "夜蘭":"\n🟠若水\n🟣祭礼の弓\n🟣西風猟弓\n🟠終焉を嘆く詩\n🟣絶弦\n🔵リカーブボウ",
    "神里綾人":"\n🟠波乱月白経津\n🟠霧切の廻光\n🟠磐岩結緑\n🟣黒剣\n🟣海淵のフィナーレ\n🔵黎明の神剣",
    "タルタリヤ":"\n🟠冬極の白星\n🟠飛雷の鳴弦\n🟠若水\n🟠天空の翼\n🟣弓蔵\n🟣絶弦\n🟣静寂の唄\n🟣破魔の弓\n🟣蒼翠の狩猟弓",
    "モナ":"\nメインアタッカー\n🟠四風原典\n🟣匣中日月\n\nサブアタッカー\n🟣流浪楽章\n🟠天空の巻\n\nサポート\n🔵龍殺しの英傑譚\n🟣西風秘典",
    "七七":"\n🟠波乱月白経津\n🟠風鷹剣\n🟠磐岩結緑\n🟣海淵のフィナーレ\n🟣斬岩・試作",
    "甘雨":"\n🟠アモスの弓\n🟠始まりの大魔術\n🟠狩人の道\n🟠天空の翼\n🟠冬極の白星\n🟣烈日の後嗣\n🟣破魔の弓",
    "リオセスリ":"\n🟠凛流の監視者\n🟠トゥライトゥーラの記憶\n🟠四風原典\n🟠久遠流転の大典\n🟣流浪楽章\n🟣果てなき紺碧の唄\n🟠浮世の錠\n🟣純水流華\n🟣ドドコの物語\n🟣冬忍びの実",
    "申鶴":"\n🟠息災\n🟠草薙の稲光\n🟠破天の槍\n🟠和璞鳶\n🟠天空の脊\n🟣西風長槍\n🟣斬波のひれ長",
    "アーロイ":"\n🟠若水\n🟠飛雷の鳴弦\n🟠天空の翼\n🟣弓蔵\n🟠冬極の白星\n🟣破魔の弓\n🟣静寂の唄\n🟣蒼翠の狩猟弓\n🟣プレデター",
    "エウルア":"\n🟠松韻の響く頃\n🟠狼の末路\n🟣惡王丸\n🟠無工の剣\n🟣螭龍の剣\n🟣タイダル・シャドー\n🟣雪葬の星銀\n🟣古華・試作",
    "神里綾華":"\n🟠霧切の廻光\n🟠磐岩結緑\n🟠波乱月白経津\n🟣海淵のフィナーレ\n🔵黎明の神剣\n🟣黒剣",
    "リネ":"\n🟠始まりの大魔術\n🟠若水\n🟠天空の翼\n🟠アモスの弓\n🟣烈日の後嗣\n🟣破魔の弓",
    "胡桃":"\n🟠護摩の杖\n🟠和璞鳶\n🟠赤砂の杖\n🟣千岩長槍\n🟣死闘の槍\n🟣フィヨルドの歌\n🟣匣中滅龍\n🔵黒纓槍",
    "クレー":"\n🟠四風原典\n🟣流浪楽章\n🟠神楽の真意\n🟠浮世の錠\n🟠天空の巻\n🟣ドドコの物語\n🟣純水流華",
    "ディシア":"\n🟠葦海の標\n🟠狼の末路\n🟠赤角石塵滅砕\n🟣螭龍の剣\n🟣携帯型チェーンソー\n🟣鉄彩の花\n🟣雨裁\n🟣マカイラの水色\n🟣西風大剣\n🟣桂木斬長正\n🟣タイダル・シャドー\n🟣鐘の剣",
    "ディルック":"\n🟠葦海の標\n🟠狼の末路\n🟠赤角石塵滅砕\n🟣螭龍の剣\n🟣タイダル・シャドー\n🟣鉄彩の花\n🟣マカイラの水色\n🟣雨裁\n🟣祭礼の大剣",
    "宵宮":"\n🟠飛雷の鳴弦\n🟠若水\n🟠天空の翼\n🟠アモスの弓\n🟣弓蔵\n🟣破魔の弓",
    "アルハイゼン":"\n🟠萃光の裁葉\n🟠磐岩結緑\n🟠霧切の廻光\n🟠波乱月白経津\n🟣黒剣\n🟣狼牙\n🔵黎明の神剣\n🟣鉄蜂の刺し\n🟣サイフォスの月明かり\n🟣東花坊時雨",
    "ナヒーダ":"\n🟠千夜に浮かぶ夢\n🟠神楽の真意\n🔵魔導緒論\n🟣彷徨える星\n🟣祭礼の断片\n🟣金珀・試作",
    "ティナリ":"\n🟠狩人の道\n🟠アモスの弓\n🟠始まりの大魔術\n🟠冬極の白星\n🟣烈日の後嗣\n🟣破魔の弓",
    "主人公(草)":"\n🟠蒼古なる自由への誓い\n🟣祭礼の剣\n🟣西風剣\n🟠磐岩結緑\n🟣サイフォスの月明かり\n🟣鉄蜂の刺し\n🟣東花坊時雨\n🟣腐植の剣\n🟣サーンドルの渡し守",
    "白朮":"\n🟠碧落の瓏\n🟣古祠の瓏\n🟣金珀・試作\n🔵龍殺しの英傑譚\n🟠不滅の月華",
    "雷電将軍":"\n🟠草薙の稲光\n🟠護摩の杖\n🟣匣中滅龍\n🟣斬波のひれ長\n🟣漁獲\n🟠天空の脊\n🟣西風長槍\n🟣喜多院十文字槍",
    "セノ":"\n🟠赤砂の杖\n🟠和璞鳶\n🟣フィヨルドの歌\n🔵白纓槍\n🟣死闘の槍\n🟣風信の矛\n🟣星鎌・試作",
    "主人公(雷)":"\n🟠蒼古なる自由への誓い\n🟣祭礼の剣\n🟣西風剣\n🟠天空の刃\n🟠磐岩結緑\n🟣サイフォスの月明かり\n🟣原木刀",
    "刻晴":"\n🟠霧切の廻光\n🟠磐岩結緑\n🟠波乱月白経津\n🟣匣中龍吟\n🟣狼牙\n🔵黎明の神剣\n🟣黒剣\n🟣海淵のフィナーレ\n🔵暗鉄剣",
    "八重神子":"\n🟠神楽の真意\n🟣流浪楽章\n🟠千夜に浮かぶ夢\n🟠天空の巻\n🟣万国諸海の図譜\n🟣匣中日月",
    "放浪者":"\n🟠トゥライトゥーラの記憶\n🟣流浪楽章\n🟠天空の巻\n🟠四風原典\n🟣匣中日月\n🟣純水流華",
    "ジン":"\n🟠磐岩結緑\n🟠天空の刃\n🟣西風剣\n🟣腐植の剣\n🟣天目影打\n🟣狼牙\n🟣サーンドルの渡し守",
    "主人公(風)":"\n🟠蒼古なる自由への誓い\n🟠磐岩結緑\n🟠天空の刃\n🟣祭礼の剣\n🟣西風剣\n🟣腐植の剣\n🟣狼牙\n🟠霧切の廻光\n🟣サーンドルの渡し守",
    "ウェンティ":"\n🟠終焉を嘆く詩\n🟠冬極の白星\n🟠若水\n🟠天空の翼\n🟣西風猟弓\n🟣ダークアレイの狩人\n🟣曚雲の月\n🟣絶弦",
    "楓原万葉":"\n🟠蒼古なる自由への誓い\n🟣サイフォスの月明かり\n🟣鉄蜂の刺し\n🟣祭礼の剣\n🟣西風剣",
    "魈":"\n🟠護摩の杖\n🟠和璞鳶\n🟠赤砂の杖\n🟣千岩長槍\n🟣死闘の槍\n🟣星鎌・試作",
    "閑雲":"\n🟠鶴鳴の余韻\n🟠天空の巻\n🟣誓いの明瞳\n🟠赤角石塵滅砕\n🟣金珀・試作\n🟣西風秘典\n🔵龍殺しの英傑譚\n🟣螭龍の剣\n🟣純水流華",
    //星4
    "凝光":"\n🟠神楽の真意\n🟠浮世の錠\n🟠四風原典\n🟣流浪楽章\n🟠天空の巻\n🟣匣中日月\n🟣ドドコの物語",
    "ゴロー":"\n🟠終焉を嘆く詩\n🟣祭礼の弓\n🟣西風猟弓",
    "雲菫":"\n🟠草薙の稲光\n🟣西風長槍\n🟠天空の脊\n🟣漁獲\n🟣喜多院十文字槍",
    "ノエル":"\n🟠赤角石塵滅砕\n🟣白影の剣\n🟠天空の傲\n🟣螭龍の剣",
    "行秋":"\n🟣祭礼の剣\n🟠磐岩結緑\n🟣サーンドルの渡し守\n🟠蒼古なる自由への誓い\n🟣西風剣\n🟣狼牙\n🟣原木刀",
    "バーバラ":"\n🔵龍殺しの英傑譚\n🟣金珀・試作\n🟠不滅の月華",
    "キャンディス":"\n🟠草薙の稲光\n🟠護摩の杖\n🟣正義の報酬\n🔵黒纓槍\n🟣西風長槍\n🟠天空の脊\n🟣星鎌・試作",
    "ロサリア":"\n🟠草薙の稲光\n🟣西風長槍\n🟠天空の脊\n🟠和璞鳶\n🟠護摩の杖\n🟣斬波のひれ長\n🟣ドラゴンスピア\n🔵黒纓槍",
    "ディオナ":"\n🟣祭礼の弓\n🟠終焉を嘆く詩\n🟣西風猟弓\n🔵リカーブボウ",
    "ガイア":"\n🟠磐岩結緑\n🟣西風剣\n🟣狼牙\n🟣海淵のフィナーレ\n🟠天空の刃\n🔵黎明の神剣\n🟣天目影打\n🔵冷刃",
    "ミカ":"\n🟣西風長槍\n🟣正義の報酬\n🔵黒纓槍\n🟣星鎌・試作",
    "レイラ":"\n🟣西風剣\n🟠聖顕の鍵\n🟠磐岩結緑\n🟣船渠剣\n🔵黎明の神剣\n🟣腐植の剣\n🟣サーンドルの渡し守",
    "シャルロット":"\n🟣誓いの明瞳\n🟣西風秘典\n🟣金珀・試作\n🟣純水流華\n🟣祭礼の断片\n🔵龍殺しの英傑譚",
    "フレミネ":"\n🟠松韻の響く頃\n🟠狼の末路\n🟣螭龍の剣\n🟠葦海の標\n🟣桂木斬長正\n🟣雪葬の星銀\n🟣タイダル・シャドー\n🟣黒岩の斬刀\n🟣古華・試作\n🔵飛天大御剣",
    "重雲":"\n🟠葦海の標\n🟠狼の末路\n🟣祭礼の大剣\n🟣千岩古剣\n🟣螭龍の剣\n🟣古華・試作\n🔵理屈責め",
    "トーマ":"\n🟣西風長槍\n🔵黒纓槍\n🟣正義の報酬\n🟣匣中滅龍\n🟣喜多院十文字槍\n🟣ムーンピアサー\n🟣フィヨルドの歌",
    "シュヴルーズ":"\n🟠護摩の杖\n🟣正義の報酬\n🔵黒纓槍\n🟣西風長槍",
    "香菱":"\n🟠赤砂の杖\n🟠草薙の稲光\n🟣漁獲\n🟠天空の脊\n🟠護摩の杖\n🟣斬波のひれ長\n🟣匣中滅龍\n🟣フィヨルドの歌\n🟣喜多院十文字槍\n🟣星鎌・試作",
    "辛炎":"\n🟠松韻の響く頃\n🟠狼の末路\n🟠赤角石塵滅砕\n🟣西風大剣\n🟣千岩古剣\n🟣螭龍の剣\n🟣白影の剣\n🟣話死合い棒",
    "アンバー":"\n🟠冬極の白星\n🟠天空の翼\n🔵弾弓\n🔵シャープシューターの誓い",
    "煙緋":"\n🟠四風原典\n🟣流浪楽章\n🟠浮世の錠\n🟠天空の巻\n🟣ドドコの物語\n🟣黒岩の緋玉",
    "ベネット":"\n🟠霧切の廻光\n🟠風鷹剣\n🟠天空の刃\n🟣ダークアレイの閃光\n🟣西風剣\n🟣原木刀",
    "嘉明":"\n🟠裁断\n🟠狼の末路\n🟠葦海の標\n🟣螭龍の剣\n🟣スーパーアルティメット覇王魔剣\n🟣話死合い棒\n🟣千岩古剣\n🟣タイダル・シャドー",
    "綺良々":"\n🟠聖顕の鍵\n🟠磐岩結緑\n🟣船渠剣\n🟣西風剣\n🟣祭礼の剣",
    "ヨォーヨ":"\n🟣西風長槍\n🟣正義の報酬\n🔵黒纓槍\n🟣喜多院十文字槍\n🟣ムーンピアサー",
    "カーヴェ":"\n🟣マカイラの水色\n🟣西風大剣\n🟣祭礼の大剣\n🟣鉄彩の花\n🟣森林のレガリア\n🟣雨裁",
    "コレイ":"\n🟠終焉を嘆く詩\n🟣祭礼の弓\n🟣西風猟弓\n🟣絶弦\n🟣静寂の唄\n🟣竭沢",
    "レザー":"\n🟠狼の末路\n🟠松韻の響く頃\n🟠葦海の標\n🟣螭龍の剣\n🟣タイダル・シャドー\n🟣鉄彩の花\n🟣雨裁\n🟣マカイラの水色\n🔵龍血を浴びた剣\n🔵飛天大御剣",
    "北斗":"\n🟠狼の末路\n🟠天空の傲\n🟣惡王丸\n🟣西風大剣\n🟣千岩古剣\n🟣鉄彩の花\n🟣雨裁\n🟣マカイラの水色\n🔵龍血を浴びた剣",
    "フィッシュル":"\n🟠若水\n🟠冬極の白星\n🟠天空の翼\n🟠終焉を嘆く詩\n🟣絶弦\n🟣ダークアレイの狩人\n🟣静寂の唄\n🟣幽夜のワルツ\n🟣リングボウ",
    "ドリー":"\n🟣祭礼の大剣\n🟣携帯型チェーンソー\n🟣西風大剣\n🟣森林のレガリア\n🟣桂木斬長正",
    "久岐忍":"\n🟠聖顕の鍵\n🟣船渠剣\n🟠蒼古なる自由への誓い\n🟣鉄蜂の刺し\n🟣サイフォスの月明かり\n🟣東花坊時雨\n🟣原木刀\n🔵暗鉄剣",
    "リサ":"\nメイン火力\n🟠四風原典\n🟠天空の巻\n\nサブ火力\n🟠神楽の真意\n🟣流浪楽章\n🟣匣中日月\n🟣満悦の実\n🔵魔導緒論",
    "九条裟羅":"\n🟠終焉を嘆く詩\n🟠天空の翼\n🟣祭礼の弓\n🟣曚雲の月\n🟣ダークアレイの狩人\n🟣落霞",
    "ファルザン":"\n🟣西風猟弓\n🟠終焉を嘆く詩",
    "鹿野院平蔵":"\n🟠四風原典\n🟣流浪楽章\n🟠神楽の真意\n🟣匣中日月\n🟠天空の巻\n🟣祭礼の断片\n🟣万国諸海の図譜",
    "スクロース":"\n🟠千夜に浮かぶ夢\n🟣祭礼の断片\n🟣彷徨える星\n🔵龍殺しの英傑譚\n🟣流浪楽章\n🟣白辰の輪",
    "リネット":"\n🟠蒼古なる自由への誓い\n🟣祭礼の剣\n🟣西風剣\n🟠天空の刃\n🟣腐植の剣\n🟣サーンドルの渡し守\n🟣海淵のフィナーレ\n🟣狼牙",
    "早柚":"\n🟠狼の末路\n🟣マカイラの水色\n🟣西風大剣\n🟣桂木斬長正\n🔵龍血を浴びた剣\n🟣雨裁\n🟣鉄彩の花"
};

const messageReplies2 = {
    //星5
    "ナヴィア":"\nhttps://lata.notion.site/lata/27096133685449ce8e5b92d5ede23b2c?pvs=4",
    "荒瀧一斗":"\nhttps://lata.notion.site/lata/a2419140e7df417ab98913eeff97526c?pvs=4",
    "主人公(岩)":"",
    "アルベド":"\nhttps://lata.notion.site/lata/ba08322988a649d5980cb1b28bd4bef3?pvs=4",
    "鍾離":"\nhttps://lata.notion.site/lata/86b6e3919df5476385736fb85fcafaf1?pvs=4",
    "珊瑚宮心海":"\nhttps://lata.notion.site/lata/3deb0896b6bc4e3dbf506779f021e00e?pvs=4",
    "主人公(水)":"",
    "フリーナ":"\nhttps://lata.notion.site/lata/966d83ed9082416e85f762c442659825?pvs=4",
    "ヌヴィレット":"\nhttps://lata.notion.site/lata/3962e9a7dca34b83af5da18f783cb60e?pvs=4",
    "ニィロウ":"\nhttps://lata.notion.site/lata/82be03b37eb74cd8a465c583e09c61ee?pvs=4",
    "夜蘭":"\nhttps://lata.notion.site/lata/99dca7bd7d0144aa8d87fa8f4a7a6729?pvs=4",
    "神里綾人":"\nhttps://lata.notion.site/lata/03e4a5e7cd704d1db02c2d1120855ded?pvs=4",
    "タルタリヤ":"\nhttps://lata.notion.site/lata/fb97bfddb53549df9bf9bf6498708d0e?pvs=4",
    "モナ":"\nhttps://lata.notion.site/lata/340aa6421e924249a86b602064f36b13?pvs=4",
    "七七":"\nhttps://lata.notion.site/lata/139a1464ab4e4a949ba6f35694604475?pvs=4",
    "甘雨":"\nhttps://lata.notion.site/lata/b42ae17b2a0b4767baba367a79fb78fc?pvs=4",
    "リオセスリ":"\nhttps://lata.notion.site/lata/497d5ce722cd44109d4c91011d002573?pvs=4",
    "申鶴":"\nhttps://lata.notion.site/lata/fb2e19d4d76649169bf8d3413142ee2d?pvs=4",
    "アーロイ":"\nhttps://lata.notion.site/lata/4939d47c95074955b16be97fb7229230?pvs=4",
    "エウルア":"\nhttps://lata.notion.site/lata/03a9845859754900b274d628716ef13d?pvs=4",
    "神里綾華":"\nhttps://lata.notion.site/lata/951579709f254262ae6065a98427cb7d?pvs=4",
    "リネ":"\nhttps://lata.notion.site/lata/6be43d49c9894885b9787d89b8cc2855?pvs=4",
    "胡桃":"\nhttps://lata.notion.site/lata/f9e6bfc54bce472e927f7ad9bdcc3e20?pvs=4",
    "クレー":"\nhttps://lata.notion.site/lata/5f6ca14cc0d0482c951d8e51de166e97?pvs=4",
    "ディシア":"\nhttps://lata.notion.site/lata/c1f3b6b77a1f460c85c5596dd0815da5?pvs=4",
    "ディルック":"\nhttps://lata.notion.site/lata/bb0b748fda0841a7bdf579dd1010fb45?pvs=4",
    "宵宮":"\nhttps://lata.notion.site/lata/f4a2ee0e31d74f6ca26297c92a2b7dc3?pvs=4",
    "アルハイゼン":"\nhttps://lata.notion.site/lata/035c41f13f874494ae890f52704b9f65?pvs=4",
    "ナヒーダ":"\nhttps://lata.notion.site/lata/e2564dd10fa342e8a56f26f0f342af62?pvs=4",
    "ティナリ":"\nhttps://lata.notion.site/lata/89d0961e3c114f60846b14a70ccea442?pvs=4",
    "主人公(草)":"",
    "白朮":"\nhttps://lata.notion.site/lata/df3193198665433a9329f1812a189c88?pvs=4",
    "雷電将軍":"\nhttps://lata.notion.site/lata/abe73216ca224cd88a8ca46d06c0f495?pvs=4",
    "セノ":"\nhttps://lata.notion.site/lata/b553de82dc2d46109d758bbf3cf520f0?pvs=4",
    "主人公(雷)":"",
    "刻晴":"\nhttps://lata.notion.site/lata/abf8b57c34194c0d81740f1bf3ea5b0d?pvs=4",
    "八重神子":"\nhttps://lata.notion.site/lata/49d5fbbd588b4898b02332f62b5a1f98?pvs=4",
    "放浪者":"\nhttps://lata.notion.site/lata/03e823e31c9544659c7a0d5146676b7e?pvs=4",
    "ジン":"\nhttps://lata.notion.site/lata/1824eda2cf3c4c969586eb2b7d5daa17?pvs=4",
    "主人公(風)":"",
    "ウェンティ":"\nhttps://lata.notion.site/lata/65a59b1cf1664c1a9e9789a5773274f0?pvs=4",
    "楓原万葉":"\nhttps://lata.notion.site/lata/55aa57e7fddd4ad9ae998b38e2d39bdc?pvs=4",
    "魈":"\nhttps://lata.notion.site/lata/8e660d236d8440d6be0f40249f5f47d2?pvs=4",
    "閑雲":"\nhttps://lata.notion.site/lata/ab506c1f33544ad883e2529474c85f10?pvs=4",
    //星4
    "凝光":"\nhttps://lata.notion.site/lata/712d9f1d224f4bb3937dc7f3edc7381c?pvs=4",
    "ゴロー":"\nhttps://lata.notion.site/lata/7ef1efb1ae4e473288765e5b68b5296d?pvs=4",
    "雲菫":"\nhttps://lata.notion.site/lata/6d89a809bb5b43ff99486da048659e3d?pvs=4",
    "ノエル":"\nhttps://lata.notion.site/lata/3a75c619079b45ad8337b33f64920c57?pvs=4",
    "行秋":"\nhttps://lata.notion.site/lata/87121103fe70488b8ac4f09458c58353?pvs=4",
    "バーバラ":"\nhttps://lata.notion.site/lata/f5cda2a0472e45249eeb60f629c09c18?pvs=4",
    "キャンディス":"\nhttps://lata.notion.site/lata/357cc4287cff47e28b40dc20f3fd0e78?pvs=4",
    "ロサリア":"\nhttps://lata.notion.site/lata/d94bfdb2290742cf867f276f2dc9cd29?pvs=4",
    "ディオナ":"\nhttps://lata.notion.site/lata/772defbf00ab436491cd93bb465cc70b?pvs=4",
    "ガイア":"\nhttps://lata.notion.site/lata/4dc2478a593944df9261c223f8d715c6?pvs=4",
    "ミカ":"\nhttps://lata.notion.site/lata/ac134acb64cf4c56a516694bfa8f431c?pvs=4",
    "レイラ":"\nhttps://lata.notion.site/lata/4af63338e3f740fabdc6b41b0fd34f2d?pvs=4",
    "シャルロット":"\nhttps://lata.notion.site/lata/297edfb866a645e5a3c929416da2c29f?pvs=4",
    "フレミネ":"\nhttps://lata.notion.site/lata/55f1d1db3e09436daa3feea05f864df7?pvs=4",
    "重雲":"\nhttps://lata.notion.site/lata/60f3941117e9494dab91e970754cbf99?pvs=4",
    "トーマ":"\nhttps://lata.notion.site/lata/9e1cecc9461a4f9cb54be0a743bc7711?pvs=4",
    "シュヴルーズ":"\nhttps://lata.notion.site/lata/fdc10c9f40bc42b182121f7d5500bc94?pvs=4",
    "香菱":"\nhttps://lata.notion.site/lata/ddd2b2a614ff42eab7aacf2c665bf216?pvs=4",
    "辛炎":"\nhttps://lata.notion.site/lata/d50caa9d35c14bbda127c569d25592cc?pvs=4",
    "アンバー":"\nhttps://lata.notion.site/lata/3af1556022704dc7afb7a0dac2533510?pvs=4",
    "煙緋":"\nhttps://lata.notion.site/lata/bf6234702d04488998c8a3ecc9af484f?pvs=4",
    "ベネット":"\nhttps://lata.notion.site/lata/a5e12eba1053404e8b15dbd1af9e1851?pvs=4",
    "嘉明":"\nhttps://lata.notion.site/lata/e7d88aeadefc41e5b4b4607d491c2a63?pvs=4",
    "綺良々":"\nhttps://lata.notion.site/lata/be2f14e9805e45fda0bbbedb234b229a?pvs=4",
    "ヨォーヨ":"\nhttps://lata.notion.site/lata/e918432c8bbb4687b03208024d59f37e?pvs=4",
    "カーヴェ":"\nhttps://lata.notion.site/lata/5362bee30e7d45459d4d3421e9a0b960?pvs=4",
    "コレイ":"\nhttps://lata.notion.site/lata/7afcee97fba347ef85d84abecdecca30?pvs=4",
    "レザー":"\nhttps://lata.notion.site/lata/b4a42c14d69f43c5bcc02dedc7e48713?pvs=4",
    "北斗":"\nhttps://lata.notion.site/lata/cc994c3662e241da8b89f57a37c85081?pvs=4",
    "フィッシュル":"\nhttps://lata.notion.site/lata/1ac37e1dd54c458296f649bb16de0fef?pvs=4",
    "ドリー":"\nhttps://lata.notion.site/lata/d0cfb2b635854c8d875d838c2e3a18d8?pvs=4",
    "久岐忍":"\nhttps://lata.notion.site/lata/1e2ae7240fdf4fef8418a91b60e0b74e?pvs=4",
    "リサ":"\nhttps://lata.notion.site/lata/9fbb0c2b171b4684b135f0ab2ae8d7c5?pvs=4",
    "九条裟羅":"\nhttps://lata.notion.site/lata/19c3edc93a484a2abf7f09841a4b9122?pvs=4",
    "ファルザン":"\nhttps://lata.notion.site/lata/b85f3391e6ca463bb726dbd7930f62da?pvs=4",
    "鹿野院平蔵":"\nhttps://lata.notion.site/lata/5bb701e0fe0541888536ffc1ea29b5aa?pvs=4",
    "スクロース":"\nhttps://lata.notion.site/lata/8d8a290f19e94b7ca951c895b0219ac1?pvs=4",
    "リネット":"\nhttps://lata.notion.site/lata/ab54267a8bf348fd8250807aac173ce1?pvs=4",
    "早柚":"\nhttps://lata.notion.site/lata/3f0a93b8c71e4bae863c98c145a0f159?pvs=4"
};

const messageReplies3 = {
    //星5
    "ナヴィア":"\n【推奨凸】\n0凸,3凸",
    "荒瀧一斗":"\n【推奨凸】\n0凸,2凸",
    "主人公(岩)": "",
    "アルベド":"\n【推奨凸】\n0凸,4凸",
    "鍾離":"\n【推奨凸】\n0凸,1凸,2凸",
    "珊瑚宮心海":"\n【推奨凸】\n0凸",
    "主人公(水)": "",
    "フリーナ":"\n【推奨凸】\n0凸,1凸,2凸",
    "ヌヴィレット":"\n【推奨凸】\n0凸,1凸,3凸",
    "ニィロウ":"\n【推奨凸】\n0凸,2凸",
    "夜蘭":"\n【推奨凸】\n0凸,1凸",
    "神里綾人":"\n【推奨凸】\n0凸,4凸",
    "タルタリヤ":"\n【推奨凸】\n0凸,1凸",
    "モナ":"\n【推奨凸】\n0凸,1凸",
    "七七":"\n【推奨凸】\n0凸",
    "甘雨":"\n【推奨凸】\n0凸,1凸",
    "リオセスリ":"\n【推奨凸】\n0凸,1凸",
    "申鶴":"\n【推奨凸】\n0凸,1凸",
    "アーロイ":"\n【推奨凸】\n",
    "エウルア":"\n【推奨凸】\n0凸,2凸",
    "神里綾華":"\n【推奨凸】\n0凸,2凸",
    "リネ":"\n【推奨凸】\n0凸,2凸",
    "胡桃":"\n【推奨凸】\n0凸,1凸",
    "クレー":"\n【推奨凸】\n0凸,2凸",
    "ディシア":"\n【推奨凸】\n1凸,4凸",
    "ディルック":"\n【推奨凸】\n0凸",
    "宵宮":"\n【推奨凸】\n0凸,2凸",
    "アルハイゼン":"\n【推奨凸】\n0凸,6凸",
    "ナヒーダ":"\n【推奨凸】\n0凸,2凸",
    "ティナリ":"\n【推奨凸】\n0凸,2凸",
    "主人公(草)":"",
    "白朮":"\n【推奨凸】\n0凸,2凸",
    "雷電将軍":"\n【推奨凸】\n0凸,2凸",
    "セノ":"\n【推奨凸】\n0凸,2凸",
    "主人公(雷)":"",
    "刻晴":"\n【推奨凸】\n0凸,4凸",
    "八重神子":"\n【推奨凸】\n0凸,4凸",
    "放浪者":"\n【推奨凸】\n0凸,2凸",
    "ジン":"\n【推奨凸】\n0凸,2凸",
    "主人公(風)":"",
    "ウェンティ":"\n【推奨凸】\n0凸,2凸",
    "楓原万葉":"\n【推奨凸】\n0凸,2凸",
    "魈":"\n【推奨凸】\n0凸,1凸",
    "閑雲":"\n【推奨凸】\n1凸,2凸",
    //星4
    "凝光":"\n【推奨凸】\n0凸,1凸",
    "ゴロー":"\n【推奨凸】\n2凸,6凸",
    "雲菫":"\n【推奨凸】\n2凸,6凸",
    "ノエル":"\n【推奨凸】\n1凸,6凸",
    "行秋":"\n【推奨凸】\n2凸,6凸",
    "バーバラ":"\n【推奨凸】\n0凸,6凸",
    "キャンディス":"\n【推奨凸】\n2凸,6凸",
    "ロサリア":"\n【推奨凸】\n2凸,6凸",
    "ディオナ":"\n【推奨凸】\n2凸,6凸",
    "ガイア":"\n【推奨凸】\n0凸,6凸",
    "ミカ":"\n【推奨凸】\n2凸,6凸",
    "レイラ":"\n【推奨凸】\n1凸,4凸",
    "シャルロット":"\n【推奨凸】\n1凸",
    "フレミネ":"\n【推奨凸】\n4凸,6凸",
    "重雲":"\n【推奨凸】\n2凸",
    "トーマ":"\n【推奨凸】\n1凸,6凸",
    "シュヴルーズ":"\n【推奨凸】\n0凸,6凸",
    "香菱":"\n【推奨凸】\n0凸,4凸",
    "辛炎":"\n【推奨凸】\n2凸,4凸",
    "アンバー":"\n【推奨凸】\n0凸",
    "煙緋":"\n【推奨凸】\n1凸,2凸",
    "ベネット":"\n【推奨凸】\n1凸,5凸",
    "嘉明":"\n【推奨凸】\n2凸,6凸",
    "綺良々":"\n【推奨凸】\n0凸,6凸",
    "ヨォーヨ":"\n【推奨凸】\n0凸,2凸",
    "カーヴェ":"\n【推奨凸】\n0凸,4凸",
    "コレイ":"\n【推奨凸】\n0凸,4凸",
    "レザー":"\n【推奨凸】\n0凸,4凸",
    "北斗":"\n【推奨凸】\n1凸,6凸",
    "フィッシュル":"\n【推奨凸】\n0凸,6凸",
    "ドリー":"\n【推奨凸】\n0凸,4凸",
    "久岐忍":"\n【推奨凸】\n0凸,2凸",
    "リサ":"\n【推奨凸】\n0凸,2凸",
    "九条裟羅":"\n【推奨凸】\n6凸",
    "ファルザン":"\n【推奨凸】\n6凸",
    "鹿野院平蔵":"\n【推奨凸】\n1凸,6凸",
    "スクロース":"\n【推奨凸】\n1凸,6凸",
    "リネット":"\n【推奨凸】\n1凸,4凸",
    "早柚":"\n【推奨凸】\n1凸,6凸"
};

const book_monthu1 = "【モンド】忘却の峡谷(自由)\n　-🔴アンバー\n　-🔵バーバラ\n　-🍃スクロース\n　-❄️ディオナ\n　-❄️アーロイ\n　-🔴クレー\n　-🔵タルタリヤ\n　-🍃🟠旅人(風・岩)\n";
const book_monthu2 = "【璃月】太山府(繁栄)\n　-🟠凝光\n　-❄️七七\n　-🟣刻晴\n　-🍃魈\n　-❄️申鶴\n　-🔵夜蘭\n　-🟠旅人(岩)\n";
const book_monthu3 = "【稲妻】菫色ノ庭(浮世)\n　-🔴トーマ\n　-🍃鹿野院平蔵\n　-🟢綺良々\n　-🔴宵宮\n　-🔵珊瑚宮心海\n　-🟣旅人(雷)\n";
const book_monthu4 = "【スメール】無学の塔(忠言)\n　-🔵キャンディス\n　-🍃ファルザン\n　-🟢ティナリ\n　-🟣セノ\n　-🟢旅人(草)\n";
const book_monthu5 = "【フォンテーヌ】蒼白の遺栄(公平)\n　-🔴リネ\n　-🔵ヌヴィレット\n　-🟠ナヴィア\n　-🔵旅人(水)";
const book_monthu = book_monthu1 + book_monthu2 + book_monthu3 + book_monthu4 + book_monthu5;

const book_tuefri1 = "【モンド】忘却の峡谷(抗争)\n　-🔴ベネット\n　-🟠ノエル\n　-🟣レザー\n　-🍃ジン\n　-❄️エウルア\n　-🔴ディルック\n　-🔵モナ\n　-🍃🟠旅人(風・岩)\n";
const book_tuefri2 = "【璃月】太山府(勤労)\n　-🟠雲菫\n　-🔴香菱\n　-❄️重雲\n　-🟢ヨォーヨ\n　-🍃楓原万葉\n　-❄️甘雨\n　-🔴胡桃\n　-🟠旅人(岩)\n";
const book_tuefri3 = "【稲妻】菫色ノ庭(風雅)\n　-🟣久岐忍\n　-🟣九条裟羅\n　-🟠荒瀧一斗\n　-❄️神里綾華\n　-🔵神里綾人\n　-🟣旅人(雷)\n";
const book_tuefri4 = "【スメール】無学の塔(創意)\n　-🟣ドリー\n　-❄️レイラ\n　-🟢カーヴェ\n　-🟢アルハイゼン\n　-🟢ナヒーダ\n　-🟢旅人(草)\n";
const book_tuefri5 = "【フォンテーヌ】蒼白の遺栄(正義)\n　-❄️シャルロット\n　-❄️フレミネ\n　-🔵フリーナ\n　-🔵旅人(水)";
const book_tuefri = book_tuefri1 + book_tuefri2 + book_tuefri3 + book_tuefri4 + book_tuefri5;

const book_wedsat1 = "【モンド】忘却の峡谷(詩文)\n　-❄️ガイア\n　-🟣フィッシュル\n　-🟣リサ\n　-❄️ロサリア\n　-❄️ミカ\n　-🟠アルベド\n　-🍃ウェンティ\n　-🍃🟠旅人(風・岩)\n";
const book_wedsat2 = "【璃月】太山府(黄金)\n　-🔵行秋\n　-🔴煙緋\n　-🔴辛炎\n　-🟣北斗\n　-🟠鍾離\n　-🟢白朮\n　-🍃閑雲\n　-🟠旅人(岩)\n";
const book_wedsat3 = "【稲妻】菫色ノ庭(天光)\n　-🟠ゴロー\n　-🍃早柚\n　-🟣雷電将軍\n　-🟣八重神子\n　-🟣旅人(雷)\n";
const book_wedsat4 = "【スメール】無学の塔(篤行)\n　-🟢コレイ\n　-🔴ディシア\n　-🔵ニィロウ\n　-🍃放浪者\n　-🟢旅人(草)\n";
const book_wedsat5 = "【フォンテーヌ】蒼白の遺栄(秩序)\n　-🔴シュヴルーズ\n　-🍃リネット\n　-❄️リオセスリ\n　-🔵旅人(水)";
const book_wedsat = book_wedsat1 + book_wedsat2 + book_wedsat3 + book_wedsat4 + book_wedsat5;

const book_sun1 = "【モンド】忘却の峡谷(自由・抗争・詩文)\n";
const book_sun2 = "【璃月】太山府(繁栄・勤労・黄金)\n";
const book_sun3 = "【稲妻】菫色ノ庭(浮世・風雅・天光)\n";
const book_sun4 = "【スメール】無学の塔(忠言・創意・篤行)\n";
const book_sun5 = "【フォンテーヌ】蒼白の遺栄(公平・正義・秩序)\n";
const book_sunend = "　-全ての秘境が解放されています。";
const book_sun = book_sun1 + book_sun2 + book_sun3 + book_sun4 + book_sun5 + book_sunend;


const material_monthu1 = "【モンド】「高塔の王」 \n🟠両手剣：松韻の響く頃\n🟣両手剣：鐘の剣\n🟣両手剣：雪葬の星銀\n🟣両手剣：狼牙\n🔵両手剣：鉄影段平\n🟠片手剣：風鷹剣\n🟣片手剣：旧貴族長剣\n🟣片手剣：ダークアレイの閃光\n🟣片手剣：西風剣\n🟣片手剣：シナバースピンドル\n🔵片手剣：冷刃\n🟣弓：幽夜のワルツ\n🟣弓：絶弦\n🟣弓：蒼翠の狩猟弓\n🟣法器：旧貴族秘法録\n🟣法器：西風秘典\n🔵法器：魔導緒論\n🔵法器：鴉羽の弓";
const material_monthu2 = "【璃月】「孤雲寒林」 \n🟣両手剣：千岩古剣\n🟣両手剣：白影の剣\n🟠片手剣：斬山の刃\n🟣片手剣：匣中龍吟\n🟣片手剣：黒岩の戦弓\n🟣片手剣：黒岩の長剣\n🔵片手剣：暗鉄剣\n🟠長柄武器：和璞鳶\n🟣長柄武器：流月の針\n🔵長柄武器：白纓槍\n🟠弓：若水\n🟣弓：弓蔵\n🔵弓：弾弓\n🟠法器：碧落の瓏\n🟣法器：匣中日月\n🟣法器：黒岩の緋玉\n🟣法器：古祠の瓏\n🔵法器：翡玉法珠";
const material_monthu3 = "【稲妻】「遠海夷地」 \n🟣両手剣：惡王丸\n🟠片手剣：霧切の廻光\n🟣片手剣：天目影打\n🟠長柄武器：赤砂の杖\n🟣長柄武器：ムーンピアサー\n🟠法器：不滅の月華\n🟣法器：白辰の輪\n🟣法器：誓いの明瞳\n🟣法器：満悦の実\n🟣法器：彷徨える星";
const material_monthu4 = "【スメール】「静謐な森のしずく」 \n🟣両手剣：森林のレガリア\n🟠片手剣：聖顕の鍵\n🟠片手剣：萃光の裁葉\n🟣片手剣：原木刀\n🟣片手剣：サイフォスの月明かり\n🟣弓：トキの嘴";
const material_monthu5 = "【フォンテーヌ】「悠久の弦」 \n🟠両手剣：裁断\n🟣片手剣：サーンドルの渡し守\n🟣長柄武器：プロスペクタードリル\n🟠弓：飛雷の鳴弦\n🟣弓：レンジゲージ";
const material_monthu = material_monthu1 + material_monthu2 + material_monthu3 + material_monthu4 + material_monthu5;

const material_tuefri1 = "【モンド】「凛風奔狼」 \n🟠両手剣：天空の傲\n🟣両手剣：祭礼の大剣\n🔵両手剣：龍血を浴びた剣\n🟠片手剣：天空の刃\n🟣片手剣：笛の剣\n🟣片手剣：降臨の剣\n🟣片手剣：黒剣\n🔵片手剣：黎明の神剣\n🟣長柄武器：死闘の槍\n🟣長柄武器：ドラゴンスピア\n🔵長柄武器：風信の矛\n🟠弓：天空の翼\n🟠弓：終焉を嘆く詩\n🟣弓：祭礼の弓\n🔵弓：シャープシューターの誓い\n🟠法器：天空の巻\n🟣法器：ドドコの物語\n🟣法器：ダークアレイの酒と詩\n🟣法器：流浪楽章\n🔵法器：龍殺しの英傑譚";
const material_tuefri2 = "【璃月】「霧海雲間」 \n🟠両手剣：無工の剣\n🟣両手剣：雨裁\n🟣両手剣：黒岩の斬刀\n🔵両手剣：理屈責め\n🟠片手剣：磐岩結緑\n🟣片手剣：斬岩・試作\n🔵片手剣：チ虎魚の刀\n🟠長柄武器：息災\n🟣長柄武器：匣中滅龍\n🟣長柄武器：旧貴族猟槍\n🟣長柄武器：黒岩の突槍\n🟣弓：澹月・試作\n🔵弓：文使い\n🔵弓：鉾槍\n🟠法器：鶴鳴の余韻\n🟣法器：昭心\n🟣法器：金珀・試作\n🔵法器：特級の宝玉";
const material_tuefri3 = "【稲妻】「鳴神御霊」 \n🟠両手剣：赤角石塵滅砕\n🟣両手剣：桂木斬長正\n🟠片手剣：波乱月白経津\n🟣片手剣：東花坊時雨\n🟣弓：プレデター\n🟣弓：曚雲の月\n🟣弓：破魔の弓";
const material_tuefri4 = "【スメール】「オアシスガーデン」 \n🟣両手剣：話死合い棒\n🟠法器：千夜に浮かぶ夢";
const material_tuefri5 = "【フォンテーヌ】「純聖な雫」 \n🟠片手剣：静水流転の輝き\n🟣片手剣：海淵のフィナーレ\n🟣片手剣：船渠剣\n🟠法器：久遠流転の大典\n🟣法器：純水流華";
const material_tuefri = material_tuefri1 + material_tuefri2 + material_tuefri3 + material_tuefri4 + material_tuefri5;

const material_wedsat1 = "【モンド】「獅牙戦士」 \n🟠両手剣：狼の末路\n🟣両手剣：旧貴族大剣\n🟣両手剣：西風大剣\n🟣両手剣：鉄彩の花\n🔵両手剣：白鉄の大剣\n🟠片手剣：蒼古なる自由への誓い\n🟣片手剣：祭礼の剣\n🟣片手剣：腐植の剣\n🔵片手剣：旅道の剣\n🟠長柄武器：天空の脊\n🟣長柄武器：西風長槍\n🟠弓：アモスの弓\n🟣弓：旧貴族長弓\n🟣弓：ダークアレイの狩人\n🟣弓：西風猟弓\n🟣弓：風花の頌歌\n🔵弓：リカーブボウ\n🟠法器：四風原典\n🟣法器：冬忍びの実\n🟣法器：祭礼の断片手剣\n🔵法器：異世界旅行記";
const material_wedsat2 = "【璃月】「漆黒の隕鉄」 \n🟣両手剣：螭龍の剣\n🟣両手剣：銜玉の海皇\n🟣両手剣：古華・試作\n🔵両手剣：飛天大御剣\n🟣片手剣：鉄蜂の刺し\n🔵片手剣：飛天御剣\n🟠長柄武器：護摩の杖\n🟠長柄武器：破天の槍\n🟣長柄武器：千岩長槍\n🟣長柄武器：星鎌・試作\n🔵長柄武器：黒纓槍\n🟣弓：リングボウ\n🟣弓：落霞\n🟠法器：浮世の錠\n🟣法器：万国諸海の図譜";
const material_wedsat3 = "【稲妻】「今昔劇画」 \n🟣片手剣：籠釣瓶一心\n🟠長柄武器：草薙の稲光\n🟣長柄武器：「漁獲」\n🟣長柄武器：喜多院十文字槍\n🟣長柄武器：斬波のひれ長\n🟠弓：冬極の白星\n🟠法器：神楽の真意";
const material_wedsat4 = "【スメール】「烈日権威」 \n🟠両手剣：葦海の標\n🟣両手剣：マカイラの水色\n🟠弓：狩人の道\n🟠弓：始まりの大魔術\n🟣弓：竭沢\n🟣弓：王の近侍\n🟣弓：静寂の唄\n🟣弓：烈日の後嗣\n🟠法器：トゥライトゥーラの記憶";
const material_wedsat5 = "【フォンテーヌ】「無垢な海」 \n🟣両手剣：タイダル・シャドー\n🟣両手剣：携帯型チェーンソー\n🟣長柄武器：正義の報酬\n🟣長柄武器：フィヨルドの歌\n🟠法器：凛流の監視者";
const material_wedsat = material_wedsat1 + material_wedsat2 + material_wedsat3 + material_wedsat4 + material_wedsat5;

const material_sun1 = "【モンド】「高塔の王」 ・「凛風奔狼」 ・「獅牙戦士」 \n";
const material_sun2 = "【璃月】「孤雲寒林」 ・「霧海雲間」 ・「漆黒の隕鉄」 \n";
const material_sun3 = "【稲妻】「遠海夷地」 ・「鳴神御霊」 ・「今昔劇画」 \n";
const material_sun4 = "【スメール】「静謐な森のしずく」 ・「オアシスガーデン」 ・「烈日権威」 \n";
const material_sun5 = "【フォンテーヌ】「悠久の弦」 ・「純聖な雫」 ・「無垢な海」 \n";
const material_sunend = "　-全ての武器突破素材が解放されています。";
const material_sun = material_sun1 + material_sun2 + material_sun3 + material_sun4 + material_sun5 + material_sunend;


//スラッシュコマンド
client.on('interactionCreate', async interaction => { //メッセージを受け取ったら
    if (!interaction.isCommand()) return; //コマンド以外は無視

    const { commandName } = interaction;
    console.log(`==== command: ${commandName} ====`);
  
  if (/ステータス/.test(commandName)) {
    // "ステータス" を含む処理
    const characterstatus = interaction.options.getString('character');
    const characterName = characterstatus.replace(" ステータス", "");
    console.log(`==== ステータスキャラ: ${characterName} ====`);
    
    if (commandName === `炎キャラのステータス`) {
      if (characterName in messageReplies) {
        if (messageReplies.hasOwnProperty(characterName)) {
          const characterStats = messageReplies[characterName] + messageReplies3[characterName] + messageReplies2[characterName];
            await interaction.reply(`${characterName}のステータス\n${characterStats}`);
          } else {
            await interaction.reply(`${characterName}のステータスは登録されていません。`);
          }
      } else {
            await interaction.reply(`${characterName}のステータスは登録されていません。`);
      }
    } else if (commandName === '岩キャラのステータス') {
        if (characterName in messageReplies) {
          if (messageReplies.hasOwnProperty(characterName)) {
          const characterStats = messageReplies[characterName] + messageReplies3[characterName] + messageReplies2[characterName];
            await interaction.reply(`${characterName}のステータス\n${characterStats}`);
          } else {
            await interaction.reply(`${characterName}のステータスは登録されていません。`);
          }
      } else {
            await interaction.reply(`${characterName}のステータスは登録されていません。`);
      }
    } else if (commandName === '水キャラのステータス') {
        if (characterName in messageReplies) {
          if (messageReplies.hasOwnProperty(characterName)) {
          const characterStats = messageReplies[characterName] + messageReplies3[characterName] + messageReplies2[characterName];
            await interaction.reply(`${characterName}のステータス\n${characterStats}`);
          } else {
            await interaction.reply(`${characterName}のステータスは登録されていません。`);
          }
      } else {
            await interaction.reply(`${characterName}のステータスは登録されていません。`);
      }
    } else if (commandName === '草キャラのステータス') {
        if (characterName in messageReplies) {
          if (messageReplies.hasOwnProperty(characterName)) {
          const characterStats = messageReplies[characterName] + messageReplies3[characterName] + messageReplies2[characterName];
            await interaction.reply(`${characterName}のステータス\n${characterStats}`);
          } else {
            await interaction.reply(`${characterName}のステータスは登録されていません。`);
          }
      } else {
            await interaction.reply(`${characterName}のステータスは登録されていません。`);
      }
    } else if (commandName === '氷キャラのステータス') {
        if (characterName in messageReplies) {
          if (messageReplies.hasOwnProperty(characterName)) {
          const characterStats = messageReplies[characterName] + messageReplies3[characterName] + messageReplies2[characterName];
            await interaction.reply(`${characterName}のステータス\n${characterStats}`);
          } else {
            await interaction.reply(`${characterName}のステータスは登録されていません。`);
          }
      } else {
            await interaction.reply(`${characterName}のステータスは登録されていません。`);
      }
    } else if (commandName === '風キャラのステータス') {
        if (characterName in messageReplies) {
          if (messageReplies.hasOwnProperty(characterName)) {
          const characterStats = messageReplies[characterName] + messageReplies3[characterName] + messageReplies2[characterName];
            await interaction.reply(`${characterName}のステータス\n${characterStats}`);
          } else {
            await interaction.reply(`${characterName}のステータスは登録されていません。`);
          }
      } else {
            await interaction.reply(`${characterName}のステータスは登録されていません。`);
      }
    } else if (commandName === '雷キャラのステータス') {
        if (characterName in messageReplies) {
          if (messageReplies.hasOwnProperty(characterName)) {
          const characterStats = messageReplies[characterName] + messageReplies3[characterName] + messageReplies2[characterName];
            await interaction.reply(`${characterName}のステータス\n${characterStats}`);
          } else {
            await interaction.reply(`${characterName}のステータスは登録されていません。`);
          }
      } else {
            await interaction.reply(`${characterName}のステータスは登録されていません。`);
      }
    }
    
} else if (/武器/.test(commandName)) {
    // "武器" を含む処理
    const armsstatus = interaction.options.getString('arms');
    const armsName = armsstatus.replace(" 武器", "");
    console.log(`==== 武器キャラ: ${armsName} ====`);
    
    if (commandName === `炎キャラの武器`) {
      if (armsName in messageReplies) {
        if (messageReplies.hasOwnProperty(armsName)) {
        const characterStats = messageReplies[armsName] + messageReplies2[armsName];
          await interaction.reply(`${armsName}の武器\n${characterStats}`);
        } else {
          await interaction.reply(`${armsName}の武器は登録されていません。`);
        }
      } else {
            await interaction.reply(`${armsName}の武器は登録されていません。`);
      }
    } else if (commandName === '岩キャラの武器') {
        if (armsName in messageReplies) {
          if (messageReplies.hasOwnProperty(armsName)) {
          const characterStats = messageReplies[armsName] + messageReplies2[armsName];
            await interaction.reply(`${armsName}の武器\n${characterStats}`);
          } else {
            await interaction.reply(`${armsName}の武器は登録されていません。`);
        }
      } else {
            await interaction.reply(`${armsName}の武器は登録されていません。`);
      }
    } else if (commandName === '水キャラの武器') {
        if (armsName in messageReplies) {
          if (messageReplies.hasOwnProperty(armsName)) {
          const characterStats = messageReplies[armsName] + messageReplies2[armsName];
            await interaction.reply(`${armsName}の武器\n${characterStats}`);
          } else {
            await interaction.reply(`${armsName}の武器は登録されていません。`);
          }
      } else {
            await interaction.reply(`${armsName}の武器は登録されていません。`);
      }
    } else if (commandName === '草キャラの武器') {
        if (armsName in messageReplies) {
          if (messageReplies.hasOwnProperty(armsName)) {
          const characterStats = messageReplies[armsName] + messageReplies2[armsName];
            await interaction.reply(`${armsName}の武器\n${characterStats}`);
          } else {
            await interaction.reply(`${armsName}の武器は登録されていません。`);
          }
      } else {
            await interaction.reply(`${armsName}の武器は登録されていません。`);
      }
    } else if (commandName === '氷キャラの武器') {
        if (armsName in messageReplies) {
          if (messageReplies.hasOwnProperty(armsName)) {
          const characterStats = messageReplies[armsName] + messageReplies2[armsName];
            await interaction.reply(`${armsName}の武器\n${characterStats}`);
          } else {
            await interaction.reply(`${armsName}の武器は登録されていません。`);
          }
      } else {
            await interaction.reply(`${armsName}の武器は登録されていません。`);
      }
    } else if (commandName === '風キャラの武器') {
        if (armsName in messageReplies) {
          if (messageReplies.hasOwnProperty(armsName)) {
          const characterStats = messageReplies[armsName] + messageReplies2[armsName];
            await interaction.reply(`${armsName}の武器\n${characterStats}`);
          } else {
            await interaction.reply(`${armsName}の武器は登録されていません。`);
          }
      } else {
            await interaction.reply(`${armsName}の武器は登録されていません。`);
      }
    } else if (commandName === '雷キャラの武器') {
        if (armsName in messageReplies) {
          if (messageReplies.hasOwnProperty(armsName)) {
          const characterStats = messageReplies[armsName] + messageReplies2[armsName];
            await interaction.reply(`${armsName}の武器\n${characterStats}`);
          } else {
            await interaction.reply(`${armsName}の武器は登録されていません。`);
          }
      } else {
            await interaction.reply(`${armsName}の武器は登録されていません。`);
      }
    }
    
} else {
    // 上記以外のコマンド名の処理
    await interaction.reply("予期せぬ不具合が発生しました。");
}
    
    
});

//Botメンション
client.on("messageCreate", (message) => {
  
  console.log(`▶ [${message.author.tag}] ${message.content}`);
  if (message.mentions.users.has(client.user.id)) {
    message.reply("Hi!");
    return;
  }
  
//ステータス
const content = message.content;
const statusKeywords = [" ステータス", "　ステータス", "のステータス"]; // 半角スペースと全角スペース

for (const keyword of statusKeywords) {
  if (content.endsWith(keyword)) {
    const baseContent = content.slice(0, -keyword.length).trim();
    if (messageReplies.hasOwnProperty(baseContent)) {
      const reply_text = messageReplies[baseContent] + messageReplies3[baseContent] + messageReplies2[baseContent];
      message.reply(reply_text)
        .then((message) => console.log("Sent message: " + reply_text))
        .catch(console.error);
      break;
    }
  }
}
  
//武器
const content1 = message.content;
const statusKeywords1 = [" 武器", "　武器", "の武器"]; // 半角スペースと全角スペース

for (const keyword of statusKeywords1) {
  if (content1.endsWith(keyword)) {
    const baseContent = content1.slice(0, -keyword.length).trim();
    if (messageReplies1.hasOwnProperty(baseContent)) {
      const reply_text = messageReplies1[baseContent] + messageReplies2[baseContent];
      message.reply(reply_text)
        .then((message) => console.log("Sent message: " + reply_text))
        .catch(console.error);
      break; // 一致したらループを抜ける
    }
  }
}
  
  
  // メッセージがBotによって送信されたものでない場合にのみ処理を行う
  if (!message.author.bot) {
    // "天賦本"が含まれているかをチェック
    if (message.content.includes("天賦本")) {
      const dayOfWeek = new Date().getDay(); // 0: 日曜日, 1: 月曜日, ..., 6: 土曜日

      let reply;

      // 曜日ごとに異なる返信を準備
      switch (dayOfWeek) {
        case 0://sun
          reply = "日曜日の天賦本\n" + book_sun;
          break;
        case 1://mon
          reply = "月曜日の天賦本\n" + book_monthu;
          break;
        case 2://tue
          reply = "火曜日の天賦本\n" + book_tuefri;
          break;
        case 3://wed
          reply = "水曜日の天賦本\n" + book_wedsat;
          break;
        case 4://thu
          reply = "木曜日の天賦本\n" + book_monthu;
          break;
        case 5://fri
          reply = "金曜日の天賦本\n" + book_tuefri;
          break;
        case 6://sat
          reply = "土曜日の天賦本\n" + book_wedsat;
          break;
        default://other
          reply = "曜日エラー";
      }

      // 返信を送信
      message.reply(reply)
        .then((message) => console.log("Sent message: " + reply))
        .catch(console.error);
    }
    
    // "武器突破素材"が含まれているかをチェック
    if (message.content.includes("武器突破素材")) {
      const dayOfWeek = new Date().getDay(); // 0: 日曜日, 1: 月曜日, ..., 6: 土曜日

      let reply;

      // 曜日ごとに異なる返信を準備
      switch (dayOfWeek) {
        case 0://sun
          reply = "日曜日の武器突破素材\n" + material_sun;
          break;
        case 1://mon
          reply = "月曜日の武器突破素材\n" + material_monthu;
          break;
        case 2://tue
          reply = "火曜日の武器突破素材\n" + material_tuefri;
          break;
        case 3://wed
          reply = "水曜日の武器突破素材\n" + material_wedsat;
          break;
        case 4://thu
          reply = "木曜日の武器突破素材\n" + material_monthu;
          break;
        case 5://fri
          reply = "金曜日の武器突破素材\n" + material_tuefri;
          break;
        case 6://sat
          reply = "土曜日の武器突破素材\n" + material_wedsat;
          break;
        default://other
          reply = "曜日エラー";
      }

      // 返信を送信
      message.reply(reply)
        .then((message) => console.log("Sent message: " + reply))
        .catch(console.error);
    }
  }
  
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
          const linesStartingWithBullet = filteredText.split('\n').filter(line => line.trim().startsWith('・')).map(line => line.replace(/^・/, ''));
          const cleanedText = linesStartingWithBullet.join('\n');
          // Extract values for specified patterns
          let attack = 0;
          let critical = 0;
          let critical_hurt = 0;
          cleanedText.split('\n').forEach(line => {
            if (line.includes('攻撃力')) {
              attack = parseFloat(line.replace('攻撃力+', '').replace('%', '').trim());
            } else if (line.includes('会心率')) {
              critical = parseFloat(line.replace('会心率+', '').replace('%', '').trim());
            } else if (line.includes('会心ダメージ')) {
              critical_hurt = parseFloat(line.replace('会心ダメージ+', '').replace('%', '').trim());
            }
          });
          
          let critical_value = critical*2+critical_hurt;
          let critical_attack_value = critical*2+critical_hurt+attack;
          
          let flower_rank = '';
          let sands_rank = '';
          let crown_rank = '';
          
          if (critical_value >= 50) {
              flower_rank = '理論値';
          } else if (critical_value >= 45) {
              flower_rank = 'SS';
          } else if (critical_value >= 40) {
              flower_rank = 'S';
          } else if (critical_value >= 30) {
              flower_rank = 'A';
          } else if (critical_value >= 20) {
              flower_rank = '臨時聖遺物';
          } else {
              flower_rank = 'ゴミ';
          }
          
          if (critical_value >= 45) {
              sands_rank = '理論値';
          } else if (critical_value >= 40) {
              sands_rank = 'SS';
          } else if (critical_value >= 35) {
              sands_rank = 'S';
          } else if (critical_value >= 25) {
              sands_rank = 'A';
          } else if (critical_value >= 15) {
              sands_rank = '臨時聖遺物';
          } else {
              sands_rank = 'ゴミ';
          }
          
          if (critical_value >= 40) {
              crown_rank = '理論値';
          } else if (critical_value >= 35) {
              crown_rank = 'SS';
          } else if (critical_value >= 30) {
              crown_rank = 'S';
          } else if (critical_value >= 20) {
              crown_rank = 'A';
          } else if (critical_value >= 10) {
              crown_rank = '臨時聖遺物';
          } else {
              crown_rank = 'ゴミ';
          }
          
          console.log('花・羽のランク: ' + flower_rank);
          console.log('時計・杯のランク: ' + sands_rank);
          console.log('冠のランク: ' + crown_rank);
          let rank = '花・羽→'+(flower_rank)+'\n時計・杯→'+(sands_rank)+'\n冠→'+(crown_rank)
                    
          console.log(cleanedText)
          // Terminate worker
          await worker.terminate();
          // Reply with the recognized text
          let relic_value = (cleanedText)+'\n\n会心値 : '+(critical_value)+'\n会心+攻撃力値 : '+(critical_attack_value)+'\n\n'+(rank)
          let error_value = (relic_value)+'\n(⚠️画像から正確にデータが読み取れなかった可能性があります。\nトリミングをして、もう一度お試しください。⚠️)'
          if ((critical_value == 0)||(critical_attack_value == 0)) {
              relic_value = error_value;
            }
          processingMessage.edit(relic_value)
        } catch (error) {
          console.error('Error processing image:', error);
          message.reply('An error occurred while processing the image.');
        }
      }
    }
  }
});


client.login(process.env.DISCORD_BOT_TOKEN);
