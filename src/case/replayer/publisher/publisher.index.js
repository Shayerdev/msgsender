const groupService = require("../../../service/group/group.service.index");
const PublisherCase = require("./publisher.case");

const groupServiceInstance = groupService.groupServiceInstance;
const caseInstance = new PublisherCase(groupServiceInstance);

module.exports = { caseInstance };
