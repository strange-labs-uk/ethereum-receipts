var StoreController = artifacts.require("./StoreController.sol");

module.exports = function(deployer) {
  deployer.deploy(StoreController);
};