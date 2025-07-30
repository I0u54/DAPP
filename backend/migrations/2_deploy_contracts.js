const Exercice1 = artifacts.require("Exercice1");
const Exercice2 = artifacts.require("Exercice2");
const Exercice3 = artifacts.require("Exercice3");
const Exercice4 = artifacts.require("Exercice4");
const Exercice5 = artifacts.require("Exercice5");
const Exercice6 = artifacts.require("Exercice6");
const Exercice7 = artifacts.require("Exercice7");
const Exercice8 = artifacts.require("Exercice8");

module.exports = function (deployer, network, accounts) {
  // Deploy Exercice1 with initial values
  deployer.deploy(Exercice1, 10, 20);
  
  // Deploy Exercice2
  deployer.deploy(Exercice2);
  
  // Deploy Exercice3
  deployer.deploy(Exercice3);
  
  // Deploy Exercice4
  deployer.deploy(Exercice4);
  
  // Deploy Exercice5
  deployer.deploy(Exercice5);
  
  // Deploy Exercice6
  deployer.deploy(Exercice6);
  
  // Deploy Exercice7
  deployer.deploy(Exercice7);
  
  // Deploy Exercice8 with first account as recipient
  deployer.deploy(Exercice8, accounts[0]);
};