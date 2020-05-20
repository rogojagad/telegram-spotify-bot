const handler = require("./handler");

exports.bootstrap = (botClient) => {
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

    botClient.onText(/\/ping/, (msg) => {
        botClient.sendMessage(msg.chat.id, "I am alive!");
    });
};
