class BotMessage {
    /**
     * Initializes a new instance of the class.
     * The constructor sets up an empty Map to manage `broadcastDraft`.
     *
     * @param {import('node-telegram-bot-api')} bot
     * @return {void}
     */
    constructor(bot) {
        this.bot = bot;
        this.broadcastDraft = new Map();
        this.broadcastHandlers = new Map();
    }

    /**
     * Constructs and broadcasts a draft key using the provided chat identifier and router.
     *
     * @param {string} chatId - The identifier of the chat for which the draft key is being generated.
     * @param {string} router - A string representing the router, which will be converted to lowercase.
     * @return {string} A formatted draft key combining the chat identifier and the lowercased router.
     */
    _broadcastDraftKey(chatId, router) {
        return `${chatId}:${router.toLowerCase()}`;
    }

    /**
     * Creates a broadcast draft entry for the specified chat and router.
     *
     * @param {string|number} chatId - The unique identifier of the chat.
     * @param {string} router - The identifier for the router configuration.
     * @param {Object} msg - The message object to be broadcasted or used in the draft.
     * @return {void} This method does not return any value.
     */
    createBroadcastDraft(chatId, router, msg) {
        const key = this._broadcastDraftKey(chatId, router);

        this.broadcastDraft.set(key, [
            ...this.broadcastDraft.get(key) || [],
            msg
        ]);
    }

    /**
     * Retrieves the broadcast draft associated with a specific chat and router.
     *
     * @param {string|number} chatId - The identifier of the chat for which the broadcast draft is to be retrieved.
     * @param {string} router - The router associated with the broadcast draft.
     * @return {*} The broadcast draft associated with the given chatId and router, or undefined if no draft exists.
     */
    findBroadcastDraft(chatId, router) {
        const key = this._broadcastDraftKey(chatId, router);
        return this.broadcastDraft.get(key);
    }

    /**
     * Clears the broadcast draft associated with the specified chat ID and router.
     *
     * @param {string|number} chatId - The unique identifier of the chat whose broadcast draft needs to be cleared.
     * @param {string} router - The identifier for the router associated with the broadcast draft.
     * @return {void} This method does not return a value.
     */
    clearBroadcastDraft(chatId, router) {
        const key = this._broadcastDraftKey(chatId, router);
        this.broadcastDraft.delete(key);
    }

    /**
     * Registers an event handler for a specific chat and router combination.
     *
     * @param {string} router - The router name associated with the event.
     * @param {Function} cb - The callback function to execute when the event is triggered.
     * @return {void}
     */
    on(router, cb) {
        this.broadcastHandlers.set(router, cb);
    }

    /**
     * Registers a broadcast handler that listens to incoming messages and executes
     * all callback functions stored in the `broadcastHandlers` list whenever a message is received.
     *
     * The method interacts with the bot instance to listen for "message" events
     * and triggers the registered callbacks with the received message as an argument.
     *
     * @return {void} This method does not return a value.
     */
    #registerBroadcastHandlers() {
        this.bot.on("message", async (msg) => {
            this.broadcastHandlers.forEach( (cb) => cb(msg));
        })
    }

    /**
     * Attaches the broadcast handler by registering it internally.
     * This method enables the integration of broadcast functionalities required for the component's operation.
     *
     * @return {void} Does not return any value.
     */
    attach() {
        this.#registerBroadcastHandlers();
    }
}

module.exports = BotMessage;
