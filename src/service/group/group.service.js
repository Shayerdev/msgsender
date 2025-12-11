/**
 * Service class to handle group-related operations.
 */
class GroupService {
    /**
     * Creates an instance of the class with the provided repository.
     *
     * @param {GroupRepositoryJson} repository - The repository instance to be used within the class.
     * @return {void}
     */
    constructor(repository) {
        this.repository = repository;
    }

    /**
     * Retrieves a list of items associated with a specific inviter ID.
     *
     * @param {string|number} inviterId - The unique identifier of the inviter whose list is to be retrieved.
     * @return {Array|Object} The list of items associated with the given inviter ID.
     */
    getListByInviterId(inviterId) {
        return this.repository.getListByInviterId(inviterId);
    }

    /**
     * Applies an action based on the invitation status in a group setting.
     *
     * @param {string} status - The status of the user in the group (e.g., "member", "left").
     * @param {Object} ctx - The context object containing information about the operation,
     * such as user and chat details.
     * @return {void} Executes the corresponding operation based on the user's invitation status.
     */
    applyActionInviteGroup(status, ctx) {
        if (status === "member") {
            this.repository.create(ctx);
        }

        if (status === "left") {
            this.repository.deleteByInviterId(ctx.from.id, ctx.chat.id);
        }
    }
}

module.exports = GroupService;
