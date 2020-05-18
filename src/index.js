process.env["NTBA_FIX_319"] = 1;
require("dotenv").config();

const express = require("express");
const handler = require("./handler");
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TELEGRAM_TOKEN;
const url = process.env.APP_HOST;
const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());

let botClient;

botClient = new TelegramBot(token);
botClient.setWebHook(`${url}/bot${token}`);

app.post(`/bot${token}`, (req, res) => {
    botClient.processUpdate(req.body);
    res.sendStatus(200);
});

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

botClient.on("message", (msg) => {
    botClient.sendMessage(msg.chat.id, "I am alive!");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
