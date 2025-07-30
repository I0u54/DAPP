// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Exercice8 {
    address public recipient;
    
    constructor(address _recipient) {
        recipient = _recipient;
    }
    
    // Fonction pour recevoir des paiements
    function receivePayment() public payable {
        require(msg.value > 0, "Le montant doit etre superieur a 0");
    }
    
    // Fonction pour retirer les fonds
    function withdraw() public {
        require(msg.sender == recipient, "Seul le destinataire peut retirer les fonds");
        require(address(this).balance > 0, "Aucun fonds disponible");
        
        payable(recipient).transfer(address(this).balance);
    }
    
    // Fonction pour obtenir le solde du contrat
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
    
    // Fonction pour obtenir l'adresse de l'expéditeur
    function getSender() public view returns (address) {
        return msg.sender;
    }
    
    // Fonction pour changer le destinataire (seulement par le destinataire actuel)
    function changeRecipient(address newRecipient) public {
        require(msg.sender == recipient, "Seul le destinataire peut changer l'adresse");
        recipient = newRecipient;
    }
    
    // Fonction fallback pour recevoir des Ethers
    receive() external payable {
        require(msg.value > 0, "Le montant doit etre superieur a 0");
    }
}