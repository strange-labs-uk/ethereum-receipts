var RepairController = artifacts.require("./RepairController.sol");

module.exports = function(deployer) {
  deployer.deploy(RepairController);
};