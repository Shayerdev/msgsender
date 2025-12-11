const BaseCase = require("../base.case");

class GroupListCase extends BaseCase {
    /**
     *
     * @param {GroupService} groupService
     */
    constructor(groupService) {
        super();

        this.groupService = groupService;
    }

    /**
     * Registers a text command handler for handling the "Список груп" command.
     * The method listens for a specific user input pattern, retrieves a list of groups
     * associated with the user, and sends an appropriate response message to the user.
     *
     * @return {void} This method does not return any value.
     */
    register() {
        this.router.on("groups", async ({ msg, bot }) => {
            this.chatId = msg.chat.id;
            const targetGroups = this.groupService.getListByInviterId(msg.from.id);

            if (!targetGroups || targetGroups.length === 0) {
                await bot.sendMessage(this.chatId, "Персик, Шот я не нашел групки, где добавлен ботик 🥲");
                return;
            }

            const groupsText = targetGroups
                .map((group, index) => `${index + 1}. ${group.chat.title}`)
                .join('\n');

            await bot.sendMessage(
                this.chatId,
                `Вот списочек груп мой персик следенький, куда ты меня присунул. Ты ето, убедись что назначил мне права публикации сообшеник... иначе все по пизде...\n\n${groupsText}`
            );
        })
    }
}

module.exports = GroupListCase;
