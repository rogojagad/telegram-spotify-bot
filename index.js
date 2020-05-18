process.env["NTBA_FIX_319"] = 1;
require("dotenv").config();

const axios = require("axios");
const nodeEnv = process.env.NODE_ENV;
const spotifyBotHost = process.env.SPOTIFY_BOT_HOST;
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TELEGRAM_TOKEN;
const utils = require("./utils");

let botClient;

if (nodeEnv === "production") {
    botClient = new TelegramBot(token);
    botClient.setWebHook(process.env.HEROKU_URL + botClient.token);
} else {
    console.log(token);
    botClient = new TelegramBot(token, { polling: true });
}

botClient.onText(/\/update/, async (msg) => {
    const chatId = msg.chat.id;

    botClient.sendMessage(
        chatId,
        "Okay, will send your request to Spotify Bot service"
    );

    try {
        const result = await axios.get(`${spotifyBotHost}/played_song`);
        const status = result.status;
        const { data } = result;
        console.log(status);

        if (status === 200) {
            const message = utils.constructTrackInfoMessage(data);

            botClient.sendMessage(chatId, message);
        } else {
            const message = utils.constructNoTrackPlayedMessage();

            botClient.sendMessage(chatId, message);
        }
    } catch (error) {
        const { status } = error.response;
        const setupUrl =
            nodeEnv !== "developmet"
                ? "https://google.com"
                : `${spotifyBotHost}/login`;

        if (status === 422) {
            botClient.sendMessage(
                chatId,
                "Looks like your environment not yet ready, you know what to do :)",
                {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: "Setup Environment",
                                    url: setupUrl,
                                },
                            ],
                        ],
                    },
                }
            );
        } else {
            botClient.sendMessage(
                chatId,
                "Ups, somethong went wrong, please try again"
            );
        }
    }
});

botClient.on("polling_error", (error) => {
    console.log(error); // => 'EFATAL'
});
