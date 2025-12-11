const InviterGroupListener = require("./inviter-group.listener");
const groupService = require("../../service/group/group.service.index");

const groupServiceInstance = groupService.groupServiceInstance;
const listenerInstance = new InviterGroupListener(groupServiceInstance);

module.exports = { listenerInstance };
