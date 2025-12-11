const TelegramBot = require("node-telegram-bot-api");
const BotRouter = require("./core/bot.router");
const caseList  = require("./case/case.list");
const listenersList  = require("./listener/listener.list");
const BotMessage = require("./core/bot.message");

class App {

    /**
     * Creates an instance of the bot with the given token and options,
     * initializes the Telegram bot, and sets up a router for handling interactions.
     *
     * @param {string} botToken - The token of the Telegram bot.
     * @param {object} botOptions - Configuration options for the Telegram bot.
     * @throws {Error} Throws an error if the bot token is not provided.
     * @return {void}
     */
    constructor(botToken, botOptions) {
        if (!botToken) {
            throw new Error("bot token is required");
        }

        const bot = new TelegramBot(botToken, botOptions);

        this.bot = bot;
        this.router = new BotRouter(bot);
        this.messenger = new BotMessage(bot);
    }

    /**
     * Iterates through a list of case classes, initializes them, and calls their `register` method if it exists.
     * Logs a warning if a case class does not have a `register` method.
     * Logs confirmation for each successfully registered case.
     *
     * @return {void} This method does not return a value.
     */
    registerCases() {
        caseList.forEach(caseInstance => {
            caseInstance.router = this.router;
            caseInstance.messenger = this.messenger;

            if (typeof caseInstance.register !== 'function') {
                console.warn(`Case ${caseInstance} doesnt have register()`);
                return;
            }

            caseInstance.register();
            console.log(`Case registered: ${caseInstance.constructor.name}`);
        });
    }

    /**
     * Registers all listener instances in the listenersList. Each listener is checked to ensure it has a `handle` method.
     * If the `handle` method does not exist, a warning is logged, and the listener is not registered.
     *
     * @return {void} Does not return a value.
     */
    registerListeners() {
        listenersList.forEach(listenerInstance => {
            listenerInstance.bot = this.bot;

            if (typeof listenerInstance.handle !== 'function') {
                console.warn(`Listener ${listenerInstance} doesnt have handle()`);
                return;
            }

            listenerInstance.handle();
        });
    }

    /**
     * Initializes the application by registering cases, attaching routes, and handling polling errors.
     *
     * @return {void} Does not return a value.
     */
    init() {
        this.registerCases();
        this.registerListeners();

        this.router.attach();
        this.messenger.attach();

        this.bot.on("polling_error", (err) => {
            console.error("[Polling error]", err.message);
        });

        console.log("🚀 Cases Successfully registered");
    }
}

module.exports = App;
