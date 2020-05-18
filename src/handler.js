require("dotenv").config();

const axios = require("axios");
const messageFactory = require("./messageFactory");
const spotifyBotHost = process.env.SPOTIFY_BOT_HOST;

exports.handleUpdate = async () => {
    try {
        const result = await axios.get(`${spotifyBotHost}/played_song`);
        const status = result.status;
        const { data } = result;
        console.log(status);

        if (status === 200) {
            const message = messageFactory.createTrackInfoMessage(data);

            botClient.sendMessage(chatId, message);
        } else {
            const message = messageFactory.createNoTrackPlayedMessage();

            botClient.sendMessage(chatId, message);
        }
    } catch (error) {
        console.log(error);
        const { status } = error.response;
        const setupUrl = `${spotifyBotHost}/login`;

        if (status === 422) {
            botClient.sendMessage(
                chatId,
                "Looks like your environment not yet ready, you know what to do :)",
                messageFactory.createSetupEnvironmentActionMessage(setupUrl)
            );
        } else {
            botClient.sendMessage(
                chatId,
                "Ups, somethong went wrong, please try again"
            );
        }
    }
};
