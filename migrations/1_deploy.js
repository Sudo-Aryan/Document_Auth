var Authenticate = artifacts.require("Certification");

module.exports = function(deployer) {
  deployer.deploy(Authenticate);
};
