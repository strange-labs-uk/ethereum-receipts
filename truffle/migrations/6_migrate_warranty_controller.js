var WarrantyController = artifacts.require("./WarrantyController.sol");

module.exports = function(deployer) {
  deployer.deploy(WarrantyController);
};