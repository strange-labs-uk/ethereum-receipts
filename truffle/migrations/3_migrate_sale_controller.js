var SaleController = artifacts.require("./SaleController.sol");

module.exports = function(deployer) {
  deployer.deploy(SaleController);
};