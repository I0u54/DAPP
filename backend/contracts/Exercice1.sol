// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Exercice1 {
    uint public nombre1;
    uint public nombre2;
    
    constructor(uint _nombre1, uint _nombre2) {
        nombre1 = _nombre1;
        nombre2 = _nombre2;
    }
    
    // Fonction view qui calcule la somme des variables d'état
    function addition1() public view returns (uint) {
        return nombre1 + nombre2;
    }
    
    // Fonction pure qui prend deux paramètres et retourne leur somme
    function addition2(uint a, uint b) public pure returns (uint) {
        return a + b;
    }
    
    // Fonctions pour modifier les variables d'état
    function setNombre1(uint _nombre1) public {
        nombre1 = _nombre1;
    }
    
    function setNombre2(uint _nombre2) public {
        nombre2 = _nombre2;
    }
}