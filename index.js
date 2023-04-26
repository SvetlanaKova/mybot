const TelegramBot = require("node-telegram-bot-api");
const { againOptions, gameOptions } = require("./options");
require("dotenv").config();

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

let chats = {};

async function startGame(id) {
  await bot.sendMessage(id, `Сейчас я загадаю число от 0 до 9 а ты угадай`);
  await bot.sendMessage(id, `Угадывай!`, gameOptions);
  const randomNumber = Math.floor(Math.random() * 10);
  chats[id] = randomNumber;
}

const arrMessageBotHi = ["Привет", "Хай", "Здравствуй", "Вечер в хату"];
const arrMessageBotBye = ["Пока", "Покеда", "Приходите еще", "До свиденья"];
const arrMessageBotQuestion = ["В каком смысле", "Что ты имеешь ввиду", "Для чего ты это спрашиваешь", "Что ты этим хочешь сказать"];

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
    return bot.sendMessage(id, `Отправь мне стикер`);
  }
  if (text === "/game") {
    return startGame(id);
  }
  // if (/Привет/gi.test(text) && userName === "o9pen") {
  //   return bot.sendMessage(id, `Привет Котенок`);
  // }
  // if (/Привет/gi.test(text) && userName === "Svetlana_hrhr") {
  //   return bot.sendMessage(id, `Приветствую Хозяйка`);
  // }
  // if (
  //   /Привет/gi.test(text) &&
  //   userName !== "Svetlana_hrhr" &&
  //   userName !== "o9pen"
  // ) {
  //   return bot.sendMessage(id, `${arrMessageBotHi[rand(0, arrMessageBotHi.length-1)]} ${firstName ? firstName : userName}`);
  // }
});

bot.on("callback_query", async (msg) => {
  const data = msg.data;
  const id = msg.message.chat.id;
  if (data === "/again") {
    return startGame(id);
  }
  if (data === "/stop") {
    return bot.sendMessage(id, `Go to hellllllllll motherfacker`);
  }
  if (+data === chats[id]) {
    await bot.sendMessage(id, `Такой ты умный!! Угадал цифру ${chats[id]}`);
    return bot.sendMessage(id, `Сыграем еще раз?`, againOptions);
  } else {
    await bot.sendMessage(id, `Не правильно, бот загадал цифру ${chats[id]}`);
    return bot.sendMessage(id, `пук`, againOptions);
  }
});

bot.on("sticker", async (msg) => {
  const text = msg.text;
  console.log(msg);
  const { id: id, first_name: firstName, username: userName } = msg.chat;
  return bot.sendMessage(id, `красивый стикер`);
});

// bot.sendMessage(58717304, `мя`); // open9
// bot.sendLocation(58717304,56.850340, 53.224129);
// bot.sendLocation(517913893,56.850340, 53.224129);
bot.sendMessage(517913893, `мя`); // мое

// bot.onText(/\/info/, (msg) => {
//   bot.sendPhoto(517913893, "https://www.somesite.com/image.jpg", {
//     caption: "Here we go ! \nThis is just a caption ",
//   });
// });

// bot.onText(/\/start/, (msg) => {
//   bot.sendMessage(msg.chat.id, "Welcome", {
//     reply_markup: {
//       keyboard: [["Sample text", "Second sample"], ["Keyboard"], ["I'm robot"]],
//     },
//   });
// });

// bot.on("message", (msg) => {
//   var Hi = "hi";
//   if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
//     bot.sendMessage(msg.chat.id, "Hello dear user");
//   }
//   var bye = "bye";
//   if (msg.text.toString().toLowerCase().includes(bye)) {
//     bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
//   }
//   var robot = "I'm robot";
//   if (msg.text.indexOf(robot) === 0) {
//     bot.sendMessage(msg.chat.id, "Yes I'm robot but not in that way!");
//   }
// });

// bot.on('message', (msg) => {
//   var location = "location";
//   if (msg.text.indexOf(location) === 0) {
//       bot.sendLocation(msg.chat.id,56.850340, 53.224129);
//       bot.sendMessage(msg.chat.id, "Here is the point");

//   }
// });

// bot.on('message', (msg) => {

//   var bye = "пока";
//   if (msg.text.toString().toLowerCase().includes(bye)) {
//   bot.sendMessage(msg.chat.id, "Have a nice day " + msg.from.first_name);
//   }
  
//   });
// bot.on('message', (msg) => {

//   var bye = "?";
//   if (msg.text.toString().toLowerCase().includes(bye)) {
//   bot.sendMessage(msg.chat.id, "не спрашивай меня ни о чем, " + msg.from.first_name);
//   }
  
//   });

bot.on('message', (msg) => {
  const sender = msg.from.first_name ? msg.from.first_name : msg.from.username;
  const hi = "привет";
  if (msg.text.toString().toLowerCase().includes(hi)) {
  bot.sendMessage(msg.chat.id, `${arrMessageBotHi[rand(0, arrMessageBotBye.length-1)]}, ${sender}`);
  }
  const bye = "пока";
  if (msg.text.toString().toLowerCase().includes(bye)) {
  bot.sendMessage(msg.chat.id, `${arrMessageBotBye[rand(0, arrMessageBotBye.length-1)]} ${sender}`);
  }
  const question = "?";
  if (msg.text.toString().toLowerCase().includes(question)) {
  bot.sendMessage(msg.chat.id, `${arrMessageBotQuestion[rand(0, arrMessageBotBye.length-1)]}?`);
  }
  const exclamation = "!";
  if (msg.text.toString().toLowerCase().includes(exclamation)) {
  bot.sendMessage(msg.chat.id, `Чего, ${sender}?`);
  }
})
