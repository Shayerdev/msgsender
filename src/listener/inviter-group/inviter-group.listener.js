const BaseListener = require("../base.listener");

/**
 * InviterGroupListener listens for and handles Telegram bot events related to changes
 * in the membership status of the bot within groups. This listener focuses on handling
 * "my_chat_member" updates and invokes appropriate actions via the provided GroupService.
 *
 * This class extends the BaseListener class and is designed to encapsulate the behavior
 * of responding to group invite-related events.
 *
 * @class
 * @augments BaseListener
 */
class InviterGroupListener extends BaseListener {
    /**
     * Creates an instance of the class.
     *
     * @param {GroupService} groupService
     * @return {void}
     */
    constructor(groupService) {
        super();
        this.groupService = groupService;
    }

    handle() {
        this.bot.on("my_chat_member", (msg) => {
            const status = msg.new_chat_member.status;
            this.groupService.applyActionInviteGroup(status, msg);
        });
    }
}

module.exports = InviterGroupListener;
