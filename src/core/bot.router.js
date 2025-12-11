const routerState = require("../state/router.state");

/**
 * The `BotRouter` class is responsible for managing routing logic for a bot instance,
 * enabling command-based and message-based navigation. It provides functionality for
 * defining, attaching, and switching between routers based on user interactions.
 */

class BotRouter {
    /**
     * @param {import('node-telegram-bot-api')} bot
     */
    constructor(bot) {
        this.bot = bot;
        this.currentRouter = null;
        this.routersMap = new Map();
        this.navigationsMap = new Map();
    }

    /**
     * Generates a navigation key by combining chat ID and a modified version of the text.
     *
     * @param {string} chatId - The identifier of the chat.
     * @param {string} text - The input text to be transformed and combined with the chat ID.
     * @return {string} The generated navigation key, which is a combination of the chat ID and the trimmed, lowercased text.
     */
    _navKey(chatId, text) {
        return `${chatId}:${text.trim().toLowerCase()}`;
    }

    /**
     * Registers a handler for a specific router name.
     *
     * @param {string} routerName - The name of the router to be registered.
     * @param {Function} handler - The handler function associated with the router name.
     * @return {void} This method does not return a value.
     */
    on(routerName, handler) {
        this.routersMap.set(routerName, handler);
    }

    /**
     * @param {BaseCase} ctx
     * @param {string} msg
     * @param {{ keyboard: Array<Array<{ text: string, router?: string }>>, resize_keyboard?: boolean, one_time_keyboard?: boolean }} args
     */
    async setKeyboardRouters(ctx, msg, args) {
        const { keyboard, ...options } = args;

        keyboard.forEach(row => {
            row.forEach(button => {
                if (!button.router) return;
                const key = this._navKey(ctx.chatId, button.text);
                this.navigationsMap.set(key, button.router);
            });
        });

        const replyMarkup = {
            keyboard: keyboard.map(row =>
                row.map(button => ({ text: button.text }))
            ),
            ...options,
        };

        routerState.routers = this.navigationsMap;

        await this.bot.sendMessage(ctx.chatId, msg, {
            reply_markup: replyMarkup,
        });
    }

    /**
     * Attaches event listeners and applies routing handlers for the bot instance.
     *
     * The method sets up a listener for incoming messages and processes them using the appropriate router handlers.
     *
     * @return {void} This method does not return any value.
     */
    attach() {
        this.#applyRouterHandleByCommand();

        this.bot.on("message", async (msg) => {
            await this.#applyRouterHandleByMessage(msg);
        });
    }

    /**
     * Processes incoming bot commands by matching the text against a regular expression pattern,
     * identifies the corresponding router handler from a map, and executes the handler.
     *
     * The method listens for text messages sent to the bot and extracts the command and optional arguments.
     * If a matching router handler is found in the routers map, it invokes the handler with the message,
     * matched data, and bot instance.
     *
     * @return {void} Does not return any value. Handles routing logic based on commands issued to the bot.
     */
    #applyRouterHandleByCommand() {
        this.bot.onText(/^\/(\w+)(?:\s+(.+))?/, async (msg, match) => {
            const routerName = match[1];
            const routerHandler = this.routersMap.get(routerName);

            if (routerHandler) {
                this.currentRouter = routerName;
                await routerHandler({ msg, match, bot: this.bot });
            }
        });
    }

    /**
     * Processes a message to determine and apply the appropriate router handler based on navigation keys.
     *
     * @param {Object} msg - The message object received from the chat.
     * @param {number} msg.chat.id - The unique identifier of the chat where the message originated.
     * @param {string} [msg.text] - The text content of the message, if available.
     */
    async #applyRouterHandleByMessage(msg) {
        if (msg.text && msg.text.startsWith('/')) {
            return null;
        }

        const key = this._navKey(msg.chat.id, msg.text || '');
        const navigation = this.navigationsMap.get(key);

        if (!navigation) {
            return null;
        }

        const routerHandler = this.routersMap.get(navigation);

        if (!routerHandler) {
            return;
        }

        this.currentRouter = navigation;

        routerState.currentRouter = this.currentRouter;

        await routerHandler({ msg, bot: this.bot });

        return Promise.resolve(true);
    }
}

module.exports = BotRouter;
