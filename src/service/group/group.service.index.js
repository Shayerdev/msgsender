const GroupService = require('./group.service');
const GroupRepositoryJson = require("../../infra/repository/group.repository.json");

const groupRepository = new GroupRepositoryJson('groups.json');
const groupServiceInstance = new GroupService(groupRepository);

module.exports = { groupServiceInstance };
