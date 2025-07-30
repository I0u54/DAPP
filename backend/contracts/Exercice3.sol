// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Exercice3 {
    string public message;
    
    constructor() {
        message = "Message initial";
    }
    
    // Fonction pour modifier la valeur de message
    function setMessage(string memory _message) public {
        message = _message;
    }
    
    // Fonction pour retourner la valeur de message
    function getMessage() public view returns (string memory) {
        return message;
    }
    
    // Fonction qui concatène deux chaînes passées en paramètres
    function concatener(string memory a, string memory b) public pure returns (string memory) {
        return string.concat(a, b);
    }
    
    // Fonction qui concatène message avec une autre chaîne
    function concatenerAvec(string memory autre) public view returns (string memory) {
        return string.concat(message, autre);
    }
    
    // Fonction qui retourne la longueur d'une chaîne
    function longueur(string memory s) public pure returns (uint) {
        return bytes(s).length;
    }
    
    // Fonction qui compare deux chaînes et retourne un booléen
    function comparer(string memory a, string memory b) public pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
}