const StartCase = require("./start/start.index");
const WishesCase = require("./wishes/wishes.index");
const GroupListCase = require("./group-list/group-list.index");
const ReplayerCase = require("./replayer/replayer.index");
const ReplayerPublisherCase = require("./replayer/publisher/publisher.index");

module.exports = [
    StartCase.caseInstance,
    WishesCase.caseInstance,
    GroupListCase.caseInstance,
    ReplayerCase.caseInstance,
    ReplayerPublisherCase.caseInstance,
];
