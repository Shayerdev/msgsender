/**
 * RouterState manages a collection of routers and keeps track of the currently active router.
 *
 * This class provides functionality to store and retrieve a set of routers
 * as well as get or set the currently active router.
 *
 * Properties:
 * - `routers`: A Map containing all the routers managed by the RouterState instance.
 * - `currentRouter`: The currently active router.
 */
class RouterState {
    /**
     * Represents the collection of routers in the system.
     * This variable typically holds data regarding network routers
     * used for communication or routing in a network infrastructure.
     * The structure and content may vary depending on the specific implementation.
     *
     * @type {Map} Router instance that manages application routes.
     */
    #routers;

    /**
     * Represents the current active router instance.
     * This variable is typically used to determine or manipulate
     * the state, configuration, or behavior of the application's routing system.
     *
     * The value of `currentRouter` may change dynamically as the application's
     * active route changes.
     *
     * Usage of this variable might include accessing router-specific properties,
     * navigating programmatically, or subscribing to route events.
     *
     * @type {string|null} Router instance that manages application routes.
     */
    #currentRouter;

    /**
     * Initializes an instance of the class.
     * Sets up an internal map to manage routers and initializes the current router to null.
     *
     * @return {void} This constructor does not return a value.
     */
    constructor() {
        this.#routers = new Map();
        this.#currentRouter = null;
    }

    /**
     * Sets the value of the routers property.
     *
     * @param {Map} value - An array of routers to be assigned.
     */
    set routers(value) {
        this.#routers = value;
    }

    /**
     * Retrieves the current collection of routers.
     *
     * @return {Map} The list of router configurations.
     */
    get routers() {
        return this.#routers;
    }

    /**
     * Sets the current router.
     *
     * @param {string|null} value - The new router object to be set.
     */
    set currentRouter(value) {
        this.#currentRouter = value;
    }

    /**
     * Retrieves the current router instance.
     *
     * @return {string|null} The current router instance.
     */
    get currentRouter() {
        return this.#currentRouter;
    }
}

module.exports = new RouterState();
