class BroadcastPostService {
    /**
     * @param {import('node-telegram-bot-api')} bot
     */
    set bot(bot) {
        this._bot = bot;
    }

    set chatId(chatId) {
        this._chatId = chatId;
    }

    _segmentDraft(draftMessages) {
        if (!draftMessages || draftMessages.length === 0) {
            return [];
        }

        const sorted = [...draftMessages].sort((a, b) => a.message_id - b.message_id);

        const segments = [];
        let i = 0;

        while (i < sorted.length) {
            const msg = sorted[i];

            if (msg.media_group_id) {
                const groupId = msg.media_group_id;
                const groupMessages = [msg];
                i++;

                while (i < sorted.length && sorted[i].media_group_id === groupId) {
                    groupMessages.push(sorted[i]);
                    i++;
                }

                segments.push({
                    type: 'media_group',
                    messages: groupMessages,
                    media_group_id: groupId,
                });
            } else {
                segments.push({
                    type: 'single',
                    messages: [msg],
                });
                i++;
            }
        }

        return segments;
    }

    /**
     * @param {Array<Object>} draftMessages
     * @param {Array<{chat: {id: number, title?: string}}>} groups
     */
    async sendDraftToGroups(draftMessages, groups) {
        const segments = this._segmentDraft(draftMessages);

        if (segments.length === 0) {
            await this._bot.sendMessage(this._chatId, "Чет ненашел ничего шо можн отправить((");
            return;
        }

        for (const segment of segments) {
            switch (segment.type) {
                case 'single':
                    await this.#sendSingleToGroups(segment.messages[0], groups);
                    break;

                case 'media_group':
                    await this.#sendMediaGroupToGroups(segment.messages, groups);
                    break;
            }
        }
    }

    async #sendSingleToGroups(msg, groups) {
        for (const group of groups) {
            await this._bot.copyMessage(group.chat.id, msg.chat.id, msg.message_id);
        }
    }

    async #sendSequenceToGroups(messages, groups) {
        for (const group of groups) {
            for (const msg of messages) {
                await this._bot.copyMessage(group.chat.id, msg.chat.id, msg.message_id);
            }
        }
    }

    async #sendMediaGroupToGroups(messages, groups) {
        const sorted = [...messages].sort((a, b) => a.message_id - b.message_id);

        const media = sorted
            .map((m, index) => {
                if (m.photo) {
                    const photoSizes = m.photo;
                    const biggest = photoSizes[photoSizes.length - 1];

                    return {
                        type: 'photo',
                        media: biggest.file_id,
                        caption: index === 0 ? (m.caption || '') : undefined,
                        parse_mode: 'HTML',
                    };
                }

                if (m.video) {
                    return {
                        type: 'video',
                        media: m.video.file_id,
                        caption: index === 0 ? (m.caption || '') : undefined,
                        parse_mode: 'HTML',
                    };
                }

                console.warn(
                    '[BroadcastPostService] Unsupported media type in media_group, skip message_id:',
                    m.message_id
                );

                return null;
            })
            .filter(Boolean);

        if (media.length === 0) {
            await this._bot.sendMessage(this._chatId, "Чет медио гуппа пустая после системной сортировки. Отмена.");
            return;
        }

        for (const group of groups) {
            try {
                await this._bot.sendMediaGroup(group.chat.id, media);
            } catch (err) {
                await this._bot.sendMessage(this._chatId, "Не смог отправить альбом в чат(( ", err.message);
            }
        }
    }
}

module.exports = BroadcastPostService;
