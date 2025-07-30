import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const exercises = [
    {
      id: 1,
      title: "Exercice 1 : Somme de deux variables",
      description: "Calcul de la somme avec fonctions view et pure",
      path: "/exercice1"
    },
    {
      id: 2,
      title: "Exercice 2 : Conversion des cryptomonnaies",
      description: "Conversion Ether vers Wei et vice versa",
      path: "/exercice2"
    },
    {
      id: 3,
      title: "Exercice 3 : Traitement des chaînes de caractères",
      description: "Gestion et manipulation des strings",
      path: "/exercice3"
    },
    {
      id: 4,
      title: "Exercice 4 : Tester le signe d'un nombre",
      description: "Vérification si un nombre est positif",
      path: "/exercice4"
    },
    {
      id: 5,
      title: "Exercice 5 : Tester la parité d'un nombre",
      description: "Vérification si un nombre est pair ou impair",
      path: "/exercice5"
    },
    {
      id: 6,
      title: "Exercice 6 : Gestion des tableaux",
      description: "Manipulation d'un tableau dynamique de nombres",
      path: "/exercice6"
    },
    {
      id: 7,
      title: "Exercice 7 : Programmation Orientée Objet (Formes géométriques)",
      description: "Contrats abstraits et héritage avec Rectangle",
      path: "/exercice7"
    },
    {
      id: 8,
      title: "Exercice 8 : Utilisation des variables globales (msg.sender et msg.value)",
      description: "Gestion des paiements et transactions",
      path: "/exercice8"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">Projet de Fin de Module</h1>
          <h2 className="text-2xl text-center mt-2">Développement d'une dApp pour le TP 3</h2>
          <p className="text-center mt-2 text-blue-100">Solidity, Truffle et ReactJS</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
              Choisissez un exercice
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {exercises.map((exercise) => (
                <Link
                  key={exercise.id}
                  to={exercise.path}
                  className="block bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg p-6 transition-all duration-200 transform hover:scale-105"
                >
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-blue-600 mb-2 hover:text-blue-800">
                      {exercise.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {exercise.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Footer Info */}
            <div className="mt-12 text-center text-gray-600">
              <p className="text-sm">
                <strong>AU:</strong> 2024/2025 | 
                <strong> Filière:</strong> Master GLCC, S2 | 
                <strong> Module:</strong> Blockchain & web3 | 
                <strong> Professeur:</strong> M. OUALLA
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;