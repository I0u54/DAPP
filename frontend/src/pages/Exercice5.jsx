import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import web3Service from '../services/web3Service';
import BlockchainInfo from '../components/BlockchainInfo';
import TransactionInfo from '../components/TransactionInfo';

const Exercice5 = () => {
  const [contract, setContract] = useState(null);
  const [number, setNumber] = useState('');
  const [results, setResults] = useState({});
  const [lastTransaction, setLastTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [testNumbers] = useState([0, 1, 2, 3, 4, 5, 10, 17, 22, 99, 100, 1001]);

  useEffect(() => {
    const contractInstance = web3Service.getContract('Exercice5');
    setContract(contractInstance);
  }, []);

  const checkParity = async (num = number) => {
    if (!contract || num === '') return;
    
    setLoading(true);
    try {
      // Test both functions
      const isEvenResult = await web3Service.callMethod(contract, 'estPair', [num]);
      const parityResult = await web3Service.callMethod(contract, 'parite', [num]);
      
      const parityText = isEvenResult ? 'PAIR' : 'IMPAIR';
      const parityColor = isEvenResult ? 'text-blue-600' : 'text-orange-600';
      
      setResults(prev => ({
        ...prev,
        [`result_${num}`]: {
          number: num,
          isEven: isEvenResult,
          parityText: parityText,
          parityString: parityResult,
          color: parityColor,
          fullText: `${num} est ${parityText} (${parityResult})`
        }
      }));
    } catch (error) {
      console.error('Error checking parity:', error);
      setResults(prev => ({
        ...prev,
        [`result_${num}`]: {
          number: num,
          fullText: `Erreur: ${error.message}`,
          color: 'text-red-600'
        }
      }));
    } finally {
      setLoading(false);
    }
  };

  const testAllNumbers = async () => {
    for (const num of testNumbers) {
      await checkParity(num);
      await new Promise(resolve => setTimeout(resolve, 300)); // Small delay between calls
    }
  };

  const generateRandomTest = async () => {
    const randomNum = Math.floor(Math.random() * 1000);
    setNumber(randomNum.toString());
    await checkParity(randomNum);
  };

  if (!contract) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600">Contrat Exercice5 non trouvé</p>
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
            Exercice 5: Tester la parité d'un nombre
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Control Panel */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Manual Test */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-600">Test manuel</h3>
                <div className="bg-blue-50 p-4 rounded">
                  <p className="text-sm text-gray-600 mb-3">
                    Entrez un nombre entier pour vérifier sa parité.
                    <br />
                    <strong>Pair:</strong> divisible par 2 (reste = 0)
                    <br />
                    <strong>Impair:</strong> non divisible par 2 (reste = 1)
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Nombre à tester:</label>
                      <input
                        type="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Entrez un nombre"
                        step="1"
                        min="0"
                      />
                    </div>
                    
                    <button
                      onClick={() => checkParity()}
                      disabled={loading || number === ''}
                      className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                      Tester la parité
                    </button>
                    
                    <button
                      onClick={generateRandomTest}
                      disabled={loading}
                      className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 disabled:opacity-50"
                    >
                      Nombre aléatoire
                    </button>
                    
                    {number && results[`result_${number}`] && (
                      <div className="bg-gray-100 p-3 rounded">
                        <p className={`font-medium ${results[`result_${number}`].color}`}>
                          {results[`result_${number}`].fullText}
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
                    Testez plusieurs nombres prédéfinis pour voir les différents résultats.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border">
                      <h4 className="font-medium mb-2">Nombres à tester:</h4>
                      <div className="grid grid-cols-4 gap-1">
                        {testNumbers.map((num, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 rounded text-xs text-center ${
                              num % 2 === 0 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-orange-100 text-orange-800'
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
                      className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:opacity-50"
                    >
                      {loading ? 'Tests en cours...' : 'Tester tous'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Information Panel */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-yellow-600">Informations</h3>
                <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">Fonctions testées:</h4>
                  <div className="text-sm text-yellow-700 space-y-2">
                    <div>
                      <p><strong>1. estPair(uint nombre)</strong></p>
                      <p className="ml-2">→ Retourne boolean</p>
                      <p className="ml-2">→ true si pair, false si impair</p>
                    </div>
                    <div>
                      <p><strong>2. parite(uint nombre)</strong></p>
                      <p className="ml-2">→ Retourne string</p>
                      <p className="ml-2">→ "pair" ou "impair"</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-yellow-200">
                    <p className="text-sm text-yellow-700">
                      <strong>Algorithme:</strong> nombre % 2 == 0
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Display */}
            {Object.keys(results).length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Résultats des tests:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {Object.entries(results)
                    .sort(([a], [b]) => {
                      const numA = parseInt(a.split('_')[1]);
                      const numB = parseInt(b.split('_')[1]);
                      return numA - numB;
                    })
                    .map(([key, result]) => (
                    <div key={key} className="bg-gray-50 p-3 rounded border">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${result.color}`}>
                          {result.number}
                        </div>
                        <div className={`text-sm font-medium ${result.color}`}>
                          {result.parityText}
                        </div>
                        {result.parityString && (
                          <div className="text-xs text-gray-600">
                            "{result.parityString}"
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Statistics */}
                <div className="mt-4 bg-gray-100 p-4 rounded">
                  <h4 className="font-semibold mb-2">Statistiques:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-600 font-medium">
                        Nombres pairs: {Object.values(results).filter(r => r.isEven).length}
                      </span>
                    </div>
                    <div>
                      <span className="text-orange-600 font-medium">
                        Nombres impairs: {Object.values(results).filter(r => !r.isEven).length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

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

export default Exercice5;