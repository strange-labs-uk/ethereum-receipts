var ItemController = artifacts.require("./ItemController.sol");

module.exports = function(deployer) {
  deployer.deploy(ItemController);
};