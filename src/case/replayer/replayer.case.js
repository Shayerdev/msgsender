const routerState = require("../../state/router.state");
const BaseCase = require("../base.case");

/**
 * Represents a case for handling replayer functionality in the application.
 * Extends the BaseCase class, managing specific logic related to replayer routing
 * and broadcasting within a group context.
 */
class ReplayerCase extends BaseCase {
    /**
     * Represents the name assigned to the router being used within the application.
     * This variable is utilized to differentiate or identify the specific router instance.
     *
     * In this context, the routerName is set to "replayer", typically indicating its functionality
     * or role related to replaying or handling replay-related operations.
     *
     * Ensure that the value of this variable aligns with expected naming conventions or descriptive
     * identifiers required for proper routing logic.
     *
     * @type {string}
     */
    routerName = "replayer";

    /**
     * Creates an instance of the class.
     *
     * @param {GroupService} groupService - The service used to manage groups.
     * @return {Object} An instance of the class.
     */
    constructor(groupService) {
        super();
        this.groupService = groupService;
    }

    /**
     * Registers the handler for the specified router name, enabling the bot to manage messages and interactions.
     * The method listens for incoming messages, processes them based on their origin and content, and sets up the necessary keyboard routes or drafts for further interactions.
     *
     * @return {void} This method does not return a value.
     */
    register() {
        this.router.on(this.routerName, async ({ msg, bot }) => {
            this.chatId = msg.chat.id;

            const targetGroups = this.groupService.getListByInviterId(msg.from.id);

            if (!targetGroups || targetGroups.length === 0) {
                await bot.sendMessage(this.chatId, "Так а шо? де группи куди їбашить будемо... 🥲");
                return;
            }

            await this.router.setKeyboardRouters(this, "Їбаш сообщенько 💋️", {
                keyboard: [
                    [{ text: "Готов. їбаш 😘", router: "publisher" }],
                    [{ text: "Отмена", router: "start" }]
                ],
                resize_keyboard: true,
                one_time_keyboard: false,
            });
        });

        this.messenger.on(this.routerName, (msg) => {
            this.chatId = msg.chat.id;

            if (this.routerName !== routerState.currentRouter) {
                this.messenger.clearBroadcastDraft(this.chatId, this.routerName);
                return;
            }

            if (msg.text && routerState.routers.has(`${this.chatId}:${msg.text.toLowerCase()}`)) {
                return;
            }

            this.messenger.createBroadcastDraft(this.chatId, "replayer", msg);
        });
    }
}

module.exports = ReplayerCase;
