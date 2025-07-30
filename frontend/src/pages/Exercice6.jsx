import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import web3Service from '../services/web3Service';
import BlockchainInfo from '../components/BlockchainInfo';
import TransactionInfo from '../components/TransactionInfo';

const Exercice6 = () => {
  const [contract, setContract] = useState(null);
  const [numbers, setNumbers] = useState([]);
  const [newNumber, setNewNumber] = useState('');
  const [getIndex, setGetIndex] = useState('');
  const [sum, setSum] = useState(null);
  const [results, setResults] = useState({});
  const [lastTransaction, setLastTransaction] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const contractInstance = web3Service.getContract('Exercice6');
    setContract(contractInstance);
    if (contractInstance) {
      loadArray();
      calculateSum();
    }
  }, []);

  const loadArray = async () => {
    if (!contract) return;
    
    try {
      const result = await web3Service.callMethod(contract, 'afficheTableau');
      setNumbers(result.map(n => n.toString()));
    } catch (error) {
      console.error('Error loading array:', error);
    }
  };

  const calculateSum = async () => {
    if (!contract) return;
    
    try {
      const result = await web3Service.callMethod(contract, 'calculerSomme');
      setSum(result.toString());
    } catch (error) {
      console.error('Error calculating sum:', error);
    }
  };

  const addNumber = async () => {
    if (!contract || !newNumber) return;
    
    setLoading(true);
    try {
      const result = await web3Service.sendTransaction(contract, 'ajouterNombre', [newNumber]);
      setLastTransaction(result);
      setResults(prev => ({
        ...prev,
        addResult: `Nombre ${newNumber} ajouté avec succès!`
      }));
      
      // Reload array and recalculate sum
      await loadArray();
      await calculateSum();
      setNewNumber('');
    } catch (error) {
      console.error('Error adding number:', error);
      setResults(prev => ({
        ...prev,
        addResult: `Erreur: ${error.message}`
      }));
    } finally {
      setLoading(false);
    }
  };

  const getElement = async () => {
    if (!contract || getIndex === '') return;
    
    setLoading(true);
    try {
      const result = await web3Service.callMethod(contract, 'getElement', [getIndex]);
      setResults(prev => ({
        ...prev,
        getElementResult: `Élément à l'index ${getIndex}: ${result.toString()}`
      }));
    } catch (error) {
      console.error('Error getting element:', error);
      setResults(prev => ({
        ...prev,
        getElementResult: `Erreur: ${error.message}`
      }));
    } finally {
      setLoading(false);
    }
  };

  const getArrayLength = async () => {
    if (!contract) return;
    
    setLoading(true);
    try {
      const result = await web3Service.callMethod(contract, 'getTaille');
      setResults(prev => ({
        ...prev,
        lengthResult: `Taille du tableau: ${result.toString()} éléments`
      }));
    } catch (error) {
      console.error('Error getting array length:', error);
      setResults(prev => ({
        ...prev,
        lengthResult: `Erreur: ${error.message}`
      }));
    } finally {
      setLoading(false);
    }
  };

  const addMultipleNumbers = async () => {
    const numbersToAdd = [5, 15, 25, 35];
    setLoading(true);
    
    for (const num of numbersToAdd) {
      try {
        await web3Service.sendTransaction(contract, 'ajouterNombre', [num]);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait between transactions
      } catch (error) {
        console.error(`Error adding ${num}:`, error);
      }
    }
    
    await loadArray();
    await calculateSum();
    setResults(prev => ({
      ...prev,
      multipleAddResult: `Ajout de [${numbersToAdd.join(', ')}] terminé!`
    }));
    setLoading(false);
  };

  if (!contract) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600">Contrat Exercice6 non trouvé</p>
          <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Retour au sommaire
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">
            Exercice 6: Gestion des tableaux
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Control Panel */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            {/* Array Display */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Tableau actuel:</h3>
              <div className="bg-gray-50 p-4 rounded border">
                <div className="flex flex-wrap gap-2 mb-4">
                  {numbers.length > 0 ? (
                    numbers.map((num, index) => (
                      <div
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        [{index}] = {num}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">Tableau vide</p>
                  )}
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Taille: {numbers.length} éléments</span>
                  <span className="text-lg font-bold text-green-600">
                    Somme: {sum !== null ? sum : 'Calcul...'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Operations Column */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-600">Opérations sur le tableau</h3>
                
                {/* Add Number */}
                <div className="bg-blue-50 p-4 rounded">
                  <h4 className="font-semibold mb-2">Ajouter un nombre:</h4>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={newNumber}
                      onChange={(e) => setNewNumber(e.target.value)}
                      className="flex-1 p-2 border rounded"
                      placeholder="Nouveau nombre"
                      step="1"
                    />
                    <button
                      onClick={addNumber}
                      disabled={loading || !newNumber}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                      Ajouter
                    </button>
                  </div>
                  {results.addResult && (
                    <p className="text-sm mt-2 text-green-600">{results.addResult}</p>
                  )}
                </div>

                {/* Get Element */}
                <div className="bg-green-50 p-4 rounded">
                  <h4 className="font-semibold mb-2">Obtenir un élément par index:</h4>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={getIndex}
                      onChange={(e) => setGetIndex(e.target.value)}
                      className="flex-1 p-2 border rounded"
                      placeholder="Index (0, 1, 2...)"
                      step="1"
                      min="0"
                    />
                    <button
                      onClick={getElement}
                      disabled={loading || getIndex === ''}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                    >
                      Obtenir
                    </button>
                  </div>
                  {results.getElementResult && (
                    <p className="text-sm mt-2 text-green-600">{results.getElementResult}</p>
                  )}
                </div>

                {/* Array Operations */}
                <div className="bg-purple-50 p-4 rounded">
                  <h4 className="font-semibold mb-2">Autres opérations:</h4>
                  <div className="space-y-2">
                    <button
                      onClick={getArrayLength}
                      disabled={loading}
                      className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 disabled:opacity-50"
                    >
                      Obtenir la taille du tableau
                    </button>
                    
                    <button
                      onClick={addMultipleNumbers}
                      disabled={loading}
                      className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700 disabled:opacity-50"
                    >
                      Ajouter plusieurs nombres (5, 15, 25, 35)
                    </button>
                  </div>
                  
                  {results.lengthResult && (
                    <p className="text-sm mt-2 text-purple-600">{results.lengthResult}</p>
                  )}
                  {results.multipleAddResult && (
                    <p className="text-sm mt-2 text-orange-600">{results.multipleAddResult}</p>
                  )}
                </div>
              </div>

              {/* Information Column */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-yellow-600">Informations</h3>
                
                <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">Fonctions disponibles:</h4>
                  <div className="text-sm text-yellow-700 space-y-2">
                    <div>
                      <p><strong>ajouterNombre(uint)</strong></p>
                      <p className="ml-2">→ Ajoute un nombre au tableau</p>
                    </div>
                    <div>
                      <p><strong>getElement(uint index)</strong></p>
                      <p className="ml-2">→ Retourne l'élément à l'index donné</p>
                      <p className="ml-2">→ Utilise require() pour vérifier l'index</p>
                    </div>
                    <div>
                      <p><strong>afficheTableau()</strong></p>
                      <p className="ml-2">→ Retourne le tableau complet</p>
                    </div>
                    <div>
                      <p><strong>calculerSomme()</strong></p>
                      <p className="ml-2">→ Calcule la somme de tous les éléments</p>
                    </div>
                    <div>
                      <p><strong>getTaille()</strong></p>
                      <p className="ml-2">→ Retourne la taille du tableau</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded border">
                  <h4 className="font-semibold mb-2">Tableau initial:</h4>
                  <p className="text-sm text-gray-600">
                    Le contrat est initialisé avec les valeurs: [10, 20, 30]
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Type:</strong> Tableau dynamique uint[]
                  </p>
                </div>

                {/* Array Statistics */}
                {numbers.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded border">
                    <h4 className="font-semibold mb-2">Statistiques:</h4>
                    <div className="text-sm space-y-1">
                      <p><strong>Nombre d'éléments:</strong> {numbers.length}</p>
                      <p><strong>Somme totale:</strong> {sum}</p>
                      <p><strong>Moyenne:</strong> {sum ? (parseFloat(sum) / numbers.length).toFixed(2) : 'N/A'}</p>
                      <p><strong>Plus petit:</strong> {numbers.length > 0 ? Math.min(...numbers.map(n => parseInt(n))) : 'N/A'}</p>
                      <p><strong>Plus grand:</strong> {numbers.length > 0 ? Math.max(...numbers.map(n => parseInt(n))) : 'N/A'}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Results Display */}
            {Object.keys(results).length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Résultats des opérations:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(results).map(([key, result]) => (
                    <div key={key} className="bg-gray-50 p-3 rounded border">
                      <p className="text-sm font-medium text-gray-700">
                        {result}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="mt-6 bg-blue-50 p-4 rounded">
              <h4 className="font-semibold mb-2">Actions rapides:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <button
                  onClick={loadArray}
                  disabled={loading}
                  className="text-sm bg-gray-600 text-white p-2 rounded hover:bg-gray-700 disabled:opacity-50"
                >
                  🔄 Actualiser
                </button>
                <button
                  onClick={calculateSum}
                  disabled={loading}
                  className="text-sm bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  🧮 Recalculer somme
                </button>
                <button
                  onClick={() => {
                    setNewNumber(Math.floor(Math.random() * 100).toString());
                  }}
                  disabled={loading}
                  className="text-sm bg-purple-600 text-white p-2 rounded hover:bg-purple-700 disabled:opacity-50"
                >
                  🎲 Nombre aléatoire
                </button>
                <button
                  onClick={() => {
                    setResults({});
                  }}
                  disabled={loading}
                  className="text-sm bg-red-600 text-white p-2 rounded hover:bg-red-700 disabled:opacity-50"
                >
                  🗑️ Vider résultats
                </button>
              </div>
            </div>

            {/* Sommaire Link */}
            <div className="mt-6 text-center">
              <Link 
                to="/" 
                className="text-blue-600 hover:underline font-medium"
              >
                Sommaire
              </Link>
            </div>
          </div>

          {/* Blockchain Info */}
          <BlockchainInfo />

          {/* Transaction Info */}
          <TransactionInfo lastTransaction={lastTransaction} />
        </div>
      </div>
    </div>
  );
};

export default Exercice6;