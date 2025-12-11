require('dotenv').config();
const App = require("./src/app");

const botToken = process.env.TOKEN_BOT;

const app = new App(botToken, {
    polling: true
});

app.init();
