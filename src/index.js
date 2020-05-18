process.env["NTBA_FIX_319"] = 1;
require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TELEGRAM_TOKEN;
const handler = require("./handler");

let botClient;

botClient = new TelegramBot(token, { polling: true });

botClient.onText(/\/update/, async (msg) => {
    const chatId = msg.chat.id;

    botClient.sendMessage(
        chatId,
        "Okay, will send your request to Spotify Bot service"
    );

    await handler.handleUpdate(botClient, chatId);
});

botClient.on("polling_error", (error) => {
    console.log(error); // => 'EFATAL'
});
