var Leaderboard = artifacts.require("./Leaderboard.sol");

module.exports = function (deployer) {
  deployer.deploy(Leaderboard);
};
