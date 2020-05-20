process.env["NTBA_FIX_319"] = 1;
require("dotenv").config();

const express = require("express");
const botBootstraper = require("./botBootstraper");
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TELEGRAM_TOKEN;
const url = process.env.APP_HOST;
const port = process.env.PORT || 4000;

const setupApp = (app) => {
    app.use(express.json());

    app.post(`/bot${token}`, (req, res) => {
        botClient.processUpdate(req.body);
        res.sendStatus(200);
    });

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
};

const app = express();
setupApp(app);

const botClient = new TelegramBot(token);
botClient.setWebHook(`${url}/bot${token}`);

botBootstraper.bootstrap(botClient);
