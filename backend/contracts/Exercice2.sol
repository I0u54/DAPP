// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Exercice2 {
    // Fonction pour convertir Ether en Wei
    function etherEnWei(uint montantEther) public pure returns (uint) {
        return montantEther * 1 ether;
    }
    
    // Fonction pour convertir Wei en Ether
    function weiEnEther(uint montantWei) public pure returns (uint) {
        return montantWei / 1 ether;
    }
}