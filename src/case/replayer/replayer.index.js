const groupService = require("../../service/group/group.service.index");
const ReplayerCase = require("./replayer.case");

const groupServiceInstance = groupService.groupServiceInstance;
const caseInstance = new ReplayerCase(groupServiceInstance);

module.exports = { caseInstance };
