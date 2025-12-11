/**
 * BaseListener serves as an abstract base class for defining custom listeners
 * in the context of handling Telegram bot events. It provides a foundational
 * framework for subclasses to implement specific behavior.
 */
class BaseListener {
    #bot;

    /**
     * @param {TelegramBot} bot
     */
    set bot(bot) {
        this.#bot = bot;
    }

    /**
     * @return {TelegramBot}
     */
    get bot() {
        return this.#bot;
    }

    /**
     * Registers an entity or performs a specific registration process.
     * This method must be implemented by subclasses or derived classes.
     *
     * @return {void} Does not return a value. Implementation may vary based on the subclass requirement.
     * @throws {Error} If the method is not implemented in a subclass or derived class.
     */
    handle() {
        throw new Error("Method handle() must be implemented");
    }
}

module.exports = BaseListener;
