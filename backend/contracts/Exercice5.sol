// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Exercice5 {
    // Fonction pour vérifier la parité d'un nombre entier
    function estPair(uint nombre) public pure returns (bool) {
        return nombre % 2 == 0;
    }
    
    // Fonction alternative qui retourne "pair" ou "impair"
    function parite(uint nombre) public pure returns (string memory) {
        if (nombre % 2 == 0) {
            return "pair";
        } else {
            return "impair";
        }
    }
}