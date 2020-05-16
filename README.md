# Telegram Spotify Bot

Telegram Chatbot that act as a client for my [Twitter Spotify Bot](https://github.com/rogojagad/twitter-spotify-bot) to tweet about my currently played song

## Installation

Use the package manager [npm](npmjs.com) to install required package.

```bash
npm install
```
Copy `.env.example` then rename it to `.env` with content as follows:

* **NODE_ENV** - To define in which evironment this app is running on, it can be `production` or `development`, it will determine the `node-telegram-bot-api` running mode (webhook or polling). For development purpose, it is recommended to use polling mode, since webhook mode require SSL Certificate (it is usually used on production only).

* **SPOTIFY_BOT_HOST** - The host address of Twitter Spotify Bot host, whether it is on localhost or deployed on production environment

* **TELEGRAM_TOKEN** - Access token given by Telegram when you [create the bot](https://core.telegram.org/bots)
