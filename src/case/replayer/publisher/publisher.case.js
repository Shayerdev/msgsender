const BaseCase = require("../../base.case");
const BroadcastPostService = require("../../../service/broadcast-post.service");

class PublisherCase extends BaseCase {
    /**
     *
     * @param {GroupService} groupService
     */
    constructor(groupService) {
        super();

        this.groupService = groupService;
        this.broadcastPostService = new BroadcastPostService();
    }

    register() {
        this.router.on("publisher", async ({ msg, bot }) => {
            this.chatId = msg.chat.id;

            this.broadcastPostService.bot = bot;
            this.broadcastPostService.chatId = this.chatId;

            const broadcastDraft = this.messenger.findBroadcastDraft(this.chatId, "replayer");

            if (!broadcastDraft) {
                await bot.sendMessage(this.chatId, "Так а шо ти там йобнув? Небачу... 🥲");
                return;
            }

            const targetGroups = this.groupService.getListByInviterId(msg.from.id);

            await this.broadcastPostService.sendDraftToGroups(broadcastDraft, targetGroups);

            this.messenger.clearBroadcastDraft(this.chatId, "replayer");

            await this.router.setKeyboardRouters(this, "Йобнув. Дивись 💋️", {
                keyboard: [
                    [{ text: "Пановай", router: "replayer" }],
                    [{ text: "Готово", router: "start" }]
                ],
                resize_keyboard: true,
                one_time_keyboard: false,
            });
        });
    }
}

module.exports = PublisherCase;
