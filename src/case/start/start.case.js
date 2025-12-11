const BaseCase = require("../base.case");

class StartCase extends BaseCase {
    register() {
        this.router.on('start', async ({ msg }) => {
            this.chatId = msg.chat.id;

            await this.router.setKeyboardRouters(this, "Оберіть дію в панелі 🚀", {
                keyboard: [
                    [{ text: "Хочу їбашить постики 😍", router: "replayer" }],
                    [{ text: "Мій список спаму 😈", router: "groups" }],
                    [{ text: "Пожеланько 🐺", router: "wishes" }],
                ],
                resize_keyboard: true,
                one_time_keyboard: false,
            });
        });
    }
}

module.exports = StartCase;
