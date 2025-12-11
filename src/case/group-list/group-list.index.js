const GroupListCase = require('./group-list.case');
const groupService = require("../../service/group/group.service.index");

const groupServiceInstance = groupService.groupServiceInstance;
const caseInstance = new GroupListCase(groupServiceInstance);

module.exports = { caseInstance };
