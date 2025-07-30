import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import web3Service from '../services/web3Service';
import BlockchainInfo from '../components/BlockchainInfo';
import TransactionInfo from '../components/TransactionInfo';

const Exercice4 = () => {
  const [contract, setContract] = useState(null);
  const [number, setNumber] = useState('');
  const [results, setResults] = useState({});
  const [lastTransaction, setLastTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [testNumbers] = useState([-10, -1, 0, 1, 42, 100]);

  useEffect(() => {
    const contractInstance = web3Service.getContract('Exercice4');
    setContract(contractInstance);
  }, []);

  const checkIfPositive = async (num = number) => {
    if (!contract || num === '') return;
    
    setLoading(true);
    try {
      const result = await web3Service.callMethod(contract, 'estPositif', [num]);
      const resultText = result ? 'POSITIF' : 'NON POSITIF (négatif ou zéro)';
      const resultColor = result ? 'text-green-600' : 'text-red-600';
      
      setResults(prev => ({
        ...prev,
        [`result_${num}`]: {
          text: `Le nombre ${num} est ${resultText}`,
          color: resultColor
        }
      }));
    } catch (error) {
      console.error('Error checking if positive:', error);
      setResults(prev => ({
        ...prev,
        [`result_${num}`]: {
          text: `Erreur: ${error.message}`,
          color: 'text-red-600'
        }
      }));
    } finally {
      setLoading(false);
    }
  };

  const testAllNumbers = async () => {
    for (const num of testNumbers) {
      await checkIfPositive(num);
      await new Promise(resolve => setTimeout(resolve, 500)); // Small delay between calls
    }
  };

  if (!contract) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600">Contrat Exercice4 non trouvé</p>
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
            Exercice 4: Tester le signe d'un nombre
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Control Panel */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Manual Test */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-600">Test manuel</h3>
                <div className="bg-blue-50 p-4 rounded">
                  <p className="text-sm text-gray-600 mb-3">
                    Entrez un nombre entier pour vérifier s'il est positif.
                    <br />
                    <strong>Positif:</strong> nombre  0
                    <br />
                    <strong>Non positif:</strong> nombre ≤ 0 (zéro ou négatif)
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Nombre à tester:</label>
                      <input
                        type="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Entrez un nombre entier"
                        step="1"
                      />
                    </div>
                    
                    <button
                      onClick={() => checkIfPositive()}
                      disabled={loading || number === ''}
                      className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                      {loading ? 'Test en cours...' : 'Tester le signe'}
                    </button>
                    
                    {results[`result_${number}`] && (
                      <div className="bg-gray-100 p-3 rounded">
                        <p className={`font-medium ${results[`result_${number}`].color}`}>
                          {results[`result_${number}`].text}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Automated Tests */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-600">Tests automatiques</h3>
                <div className="bg-green-50 p-4 rounded">
                  <p className="text-sm text-gray-600 mb-3">
                    Testez plusieurs nombres en une fois pour voir les différents résultats.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border">
                      <h4 className="font-medium mb-2">Nombres à tester:</h4>
                      <div className="flex flex-wrap gap-2">
                        {testNumbers.map((num, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 rounded text-sm ${
                              num > 0 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {num}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <button
                      onClick={testAllNumbers}
                      disabled={loading}
                      className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 disabled:opacity-50"
                    >
                      {loading ? 'Tests en cours...' : 'Tester tous les nombres'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Display */}
            {Object.keys(results).length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Résultats des tests:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Object.entries(results).map(([key, result]) => (
                    <div key={key} className="bg-gray-50 p-3 rounded border">
                      <p className={`text-sm font-medium ${result.color}`}>
                        {result.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Information Panel */}
            <div className="mt-6 bg-yellow-50 p-4 rounded border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">ℹ️ Information:</h4>
              <div className="text-sm text-yellow-700">
                <p className="mb-2">
                  <strong>Fonction testée:</strong> <code className="bg-yellow-100 px-1 rounded">estPositif(int nombre)</code>
                </p>
                <p className="mb-2">
                  <strong>Type de fonction:</strong> Pure (ne modifie pas l'état)
                </p>
                <p>
                  <strong>Logique:</strong> Retourne <code>true</code> si le nombre est strictement supérieur à 0
                </p>
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

export default Exercice4;