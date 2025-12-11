const fs = require('fs');

/**
 * A class to manage JSON file-based storage, allowing for reading, writing, and deleting JSON data.
 *
 * This class provides utility methods to work with JSON files stored at a specified path.
 * It ensures that the specified path exists, and if not, initializes an empty JSON file.
 */
class JsonStorage {
    /**
     * Creates an instance of the class and ensures the specified file path exists.
     * If the file does not exist, it creates an empty JSON file at the specified path.
     *
     * @param {string} path - The file path to be used or created.
     * @return {void}
     */
    constructor(path) {
        this.path = './data/storage/json/' + path;

        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify([]), 'utf8');
        }
    }

    /**
     * Reads and parses the content of a file located at the specified path.
     *
     * @return {Object} The parsed JSON object retrieved from the file.
     */
    read() {
        const records = fs.readFileSync(this.path, 'utf8');
        return JSON.parse(records);
    }

    /**
     * Writes the provided data to a file specified by the `path` property.
     *
     * @param {Object} data - The data to be written to the file. This data will be serialized into a JSON string.
     * @return {void} No return value.
     */
    write(data) {
        fs.writeFileSync(this.path, JSON.stringify(data, null, 2), 'utf8');
    }

    /**
     * Deletes the file located at the specified path.
     *
     * This method removes the file synchronously using the file system module (`fs.unlinkSync`).
     * Ensure that the path provided corresponds to an existing file, as this method does not perform a check before attempting to delete.
     *
     * @return {void} Does not return a value.
     */
    delete() {
        fs.unlinkSync(this.path);
    }
}

module.exports = JsonStorage;
