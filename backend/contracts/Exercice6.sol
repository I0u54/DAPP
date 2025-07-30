// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Exercice6 {
    uint[] public nombres;
    
    constructor() {
        // Initialiser le tableau avec quelques valeurs
        nombres.push(10);
        nombres.push(20);
        nombres.push(30);
    }
    
    // Fonction pour ajouter un nombre au tableau
    function ajouterNombre(uint nombre) public {
        nombres.push(nombre);
    }
    
    // Fonction pour retourner l'élément à l'indice spécifié
    function getElement(uint index) public view returns (uint) {
        require(index < nombres.length, "Index n'existe pas");
        return nombres[index];
    }
    
    // Fonction pour retourner le tableau complet
    function afficheTableau() public view returns (uint[] memory) {
        return nombres;
    }
    
    // Fonction pour calculer la somme des nombres dans le tableau
    function calculerSomme() public view returns (uint) {
        uint somme = 0;
        for (uint i = 0; i < nombres.length; i++) {
            somme += nombres[i];
        }
        return somme;
    }
    
    // Fonction pour obtenir la taille du tableau
    function getTaille() public view returns (uint) {
        return nombres.length;
    }
}