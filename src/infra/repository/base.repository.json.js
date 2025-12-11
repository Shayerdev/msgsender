/**
 * BaseRepositoryJson serves as a base class for handling JSON-based data storage and retrieval
 * through a connection interface.
 */
class BaseRepositoryJson {
    /**
     * Constructs an instance and initializes it with the provided connection.
     *
     * @param {Object} connection - The connection object to be used for the instance.
     * @return {void}
     */
    constructor(connection) {
        this.connection = connection;
    }

    /**
     * Retrieves a list of items by reading the data from the connection object.
     *
     * @return {Array} The data retrieved from the connection, which could be an array or object depending on the implementation.
     */
    getList() {
        return this.connection.read();
    }

    /**
     * Sends the provided data to the connection.
     *
     * @param {any} data - The data to be written to the connection.
     * @return {void} This method does not return a value.
     */
    updateList(data) {
        this.connection.write(data);
    }
}

module.exports = BaseRepositoryJson;
