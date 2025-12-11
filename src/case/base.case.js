/**
 * The `BaseCase` class serves as a foundational structure for managing
 * routing, messaging, and chat identification in an application framework.
 * It provides core utility members and methods that can be extended
 * and customized by subclasses.
 */
class BaseCase {
    /**
     * The `router` variable is an instance of a routing mechanism used to define
     * and handle routes within an application. It facilitates navigation and execution
     * of appropriate handlers for specific paths or URLs.
     *
     * Typically used in applications to manage and direct traffic between different
     * application views, APIs, or request-response cycles.
     */
    #router;

    /**
     * Represents an instance of a messenger utilized for communication.
     * The messenger can handle operations related to sending, receiving,
     * or managing messages within the application.
     */
    #messenger;

    /**
     * Represents the unique identifier of a chat.
     * This identifier is typically used to reference a specific chat session
     * within a messaging application or system.
     *
     * It is expected to be unique across all chat sessions and
     * may consist of alphanumeric characters or other specific formats
     * depending on the implementation.
     */
    #chatId;

    /**
     * Sets the chat ID.
     *
     * @param {string|number} id - The identifier for the chat. Can be a string or a number.
     */
    set chatId(id) {
        return this.#chatId = id;
    }

    /**
     * Retrieves the unique identifier for the chat.
     *
     * @return {string|number} The unique identifier of the chat.
     */
    get chatId() {
        return this.#chatId;
    }

    /**
     * @param {import('../core/bot.router')} router
     */
    set router(router) {
        this.#router = router;
    }

    /**
     * @return {import('../core/bot.router')}
     */
    get router() {
        return this.#router;
    }

    /**
     * Sets the messenger instance to be used by the class.
     *
     * @return {import('../core/bot.message')}
     */
    set messenger(messenger) {
        this.#messenger = messenger;
    }

    /**
     * Retrieves the messenger instance.
     *
     * @return {import('../core/bot.message')}
     */
    get messenger() {
        return this.#messenger;
    }

    /**
     * Registers an entity or performs a specific registration process.
     * This method must be implemented by subclasses or derived classes.
     *
     * @return {void} Does not return a value. Implementation may vary based on the subclass requirement.
     * @throws {Error} If the method is not implemented in a subclass or derived class.
     */
    register() {
        throw new Error("Method register() must be implemented");
    }
}

module.exports = BaseCase;
