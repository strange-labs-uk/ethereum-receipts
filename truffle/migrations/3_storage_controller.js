var StorageController = artifacts.require("./StorageController.sol");

module.exports = function(deployer) {
  deployer.deploy(StorageController);
};
