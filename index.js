const TelegramBot = require("node-telegram-bot-api");
const { againOptions, gameOptions } = require("./options");

const token = "5873215110:AAEU4_omJE_7d0NzauGKgOaJGruJe-R7av0";

const bot = new TelegramBot(token, { polling: true });

let chats = {};

async function startGame(id) {
  await bot.sendMessage(id, `Сейчас я загадаю число от 0 до 9 а ты угадай`);
  await bot.sendMessage(id, `Угадывай!`, gameOptions);
  const randomNumber = Math.floor(Math.random() * 10);
  chats[id] = randomNumber;
}

const arrMessageBot = ["Привет", "Хай", "Здравствуй", "Вечер в хату"];

const length = arrMessageBot.length - 1;

const rand = (min, max) =>
  Math.round(min - 0.5 + Math.random() * (max - min + 1));

bot.setMyCommands([
  { command: "/start", description: "Начальное приветствие" },
  { command: "/info", description: "Получить инфу" },
  { command: "/game", description: "Играть в угадай число" },
]);

bot.on("message", async (msg) => {
  const text = msg.text;
  console.log(msg);
  const { id: id, first_name: firstName, username: userName } = msg.chat;

  if (text === "/start") {
    await bot.sendSticker(
      id,
      "https://tgram.ru/wiki/stickers/img/FunnyAnimalsGif/gif/1.gif"
    );
    return bot.sendMessage(id, `Добро пожаловать, напиши привет боту`);
  }
  if (text === "/info") {
    return bot.sendMessage(
      id,
      `Что ты хочешь я ничего не умею еще, тока играть`
    );
  }
  if (text === "/game") {
    return startGame(id);
  }
  if (/Привет/gi.test(text) && userName === "o9pen") {
    return bot.sendMessage(id, `Привет Котенок`);
  }
  if (/Привет/gi.test(text) && userName === "Svetlana_hrhr") {
    return bot.sendMessage(id, `Приветствую Хозяйка`);
  }
  if (
    /Привет/gi.test(text) &&
    userName !== "Svetlana_hrhr" &&
    userName !== "o9pen"
  ) {
    return bot.sendMessage(id, `${arrMessageBot[rand(0, length)]} ${userName}`);
  }
});

bot.on("callback_query", async (msg) => {
  const data = msg.data;
  const id = msg.message.chat.id;
  if (data === "/again") {
    return startGame(id);
  }
  if (data === "/stop") {
    return bot.sendMessage(id, `Go to hellllllllll motherfacker`);;
  }
  if (+data === chats[id]) {
    await bot.sendMessage(id, `Такой ты умный!! Угадал цифру ${chats[id]}`);
    return bot.sendMessage(id, `Сыграем еще раз?`, againOptions);
  } else {
    await bot.sendMessage(id, `Не правильно, бот загадал цифру ${chats[id]}`);
    return bot.sendMessage(id, `пук`, againOptions);
  }
});
