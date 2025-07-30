// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Contrat abstrait Forme
abstract contract Forme {
    uint public x;
    uint public y;
    
    constructor(uint _x, uint _y) {
        x = _x;
        y = _y;
    }
    
    // Fonction pour déplacer la forme
    function deplacerForme(uint dx, uint dy) public {
        x = dx;
        y = dy;
    }
    
    // Fonction pour afficher les coordonnées
    function afficheXY() public view returns (uint, uint) {
        return (x, y);
    }
    
    // Fonction virtuelle pure à implémenter
    function afficheInfos() public pure virtual returns (string memory) {
        return "Je suis une forme";
    }
    
    // Fonction virtuelle à implémenter dans la classe dérivée
    function surface() public view virtual returns (uint);
}

// Contrat concret Rectangle qui hérite de Forme
contract Rectangle is Forme {
    uint public lo; // longueur
    uint public la; // largeur
    
    constructor(uint _x, uint _y, uint _longueur, uint _largeur) Forme(_x, _y) {
        lo = _longueur;
        la = _largeur;
    }
    
    // Implémentation de la fonction surface
    function surface() public view override returns (uint) {
        return lo * la;
    }
    
    // Redéfinition de la fonction afficheInfos
    function afficheInfos() public pure override returns (string memory) {
        return "Je suis Rectangle";
    }
    
    // Fonction pour afficher longueur et largeur
    function afficheLoLa() public view returns (uint, uint) {
        return (lo, la);
    }
    
    // Fonctions pour modifier les dimensions
    function setDimensions(uint _longueur, uint _largeur) public {
        lo = _longueur;
        la = _largeur;
    }
}

// Contrat pour déployer et interagir avec Rectangle
contract Exercice7 {
    Rectangle public rectangle;
    
    constructor() {
        rectangle = new Rectangle(0, 0, 10, 5);
    }
    
    function creerRectangle(uint _x, uint _y, uint _longueur, uint _largeur) public {
        rectangle = new Rectangle(_x, _y, _longueur, _largeur);
    }
    
    function getRectangleAddress() public view returns (address) {
        return address(rectangle);
    }
}