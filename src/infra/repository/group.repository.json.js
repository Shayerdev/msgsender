const JsonStorage = require('../storage/json.storage');
const BaseRepositoryJson = require("./base.repository.json");

/**
 * Repository class for managing group data stored in JSON format. Extends the BaseRepositoryJson
 * to provide functionalities specific to handling groups and their relationships based on inviter IDs.
 */
class GroupRepositoryJson extends BaseRepositoryJson {
    /**
     * Creates an instance of the class and initializes it with a connection to the specified JSON storage.
     *
     * @param {string} storagePath - The file path to the JSON storage.
     * @return {void}
     */
    constructor(storagePath) {
        const connection = new JsonStorage(storagePath);
        super(connection);
    }

    /**
     * Retrieves a filtered list of records based on the provided inviter ID.
     *
     * @param {string|number} inviterId - The ID of the inviter to filter the list of records.
     * @return {Array} An array of filtered records where the `from.id` matches the given inviter ID.
     */
    getListByInviterId(inviterId) {
        const records = this.getList();
        return records.filter(record => inviterId === record.from.id);
    }

    /**
     * Fetches an item associated with a specific inviter ID and group ID.
     *
     * @param {string} inviterId - The unique identifier of the inviter.
     * @param {string} groupId - The unique identifier of the group/chat.
     * @return {object|null} The matched record if found; otherwise, null.
     */
    getItemByInviterId(inviterId, groupId) {
        const records = this.getListByInviterId(inviterId);

        if (!records) return null;

        return records.find(record => record.chat.id === groupId);
    }

    /**
     * Adds a new data object to the records list if it does not already exist.
     *
     * @param {Object} data - The data object to add. It should contain chat and from properties.
     * @return {void}
     */
    create(data) {
        const records = this.getList();

        const checkAlreadyExist = records.find(
            record =>
                record.chat.id === data.chat.id &&
                record.from.id === data.from.id
        )

        if (checkAlreadyExist) return;

        records.unshift(data);

        this.updateList(records);
    }

    /**
     * Deletes records associated with a specific inviter ID and chat ID.
     * Filters out the records where the chat ID matches the provided value, and updates the list accordingly.
     *
     * @param {string} inviterId - The ID of the inviter whose records need to be filtered.
     * @param {string} chatId - The ID of the chat to be excluded from the inviter's records.
     * @return {void} This method does not return anything.
     */
    deleteByInviterId(inviterId, chatId) {
        const records = this.getListByInviterId(inviterId);

        if (!records) return;

        const next = records.filter(record => record.chat.id !== chatId);

        if (next.length === records.length) {
            return;
        }

        this.updateList(next);
    }
}

module.exports = GroupRepositoryJson
