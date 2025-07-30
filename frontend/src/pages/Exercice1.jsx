import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import web3Service from '../services/web3Service';
import BlockchainInfo from '../components/BlockchainInfo';
import TransactionInfo from '../components/TransactionInfo';

const Exercice1 = () => {
  const [contract, setContract] = useState(null);
  const [nombre1, setNombre1] = useState('');
  const [nombre2, setNombre2] = useState('');
  const [paramA, setParamA] = useState('');
  const [paramB, setParamB] = useState('');
  const [results, setResults] = useState({});
  const [lastTransaction, setLastTransaction] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const contractInstance = web3Service.getContract('Exercice1');
    setContract(contractInstance);
    if (contractInstance) {
      loadCurrentValues();
    }
  }, []);

  const loadCurrentValues = async () => {
    if (!contract) return;
    
    try {
      const val1 = await web3Service.callMethod(contract, 'nombre1');
      const val2 = await web3Service.callMethod(contract, 'nombre2');
      setResults(prev => ({
        ...prev,
        currentNombre1: val1.toString(),
        currentNombre2: val2.toString()
      }));
    } catch (error) {
      console.error('Error loading current values:', error);
    }
  };

  const setNombre1Value = async () => {
    if (!contract || !nombre1) return;
    
    setLoading(true);
    try {
      const result = await web3Service.sendTransaction(contract, 'setNombre1', [nombre1]);
      setLastTransaction(result);
      setResults(prev => ({
        ...prev,
        setNombre1Result: `Nombre1 mis à jour: ${nombre1}`
      }));
      await loadCurrentValues();
    } catch (error) {
      console.error('Error setting nombre1:', error);
      setResults(prev => ({
        ...prev,
        setNombre1Result: `Erreur: ${error.message}`
      }));
    } finally {
      setLoading(false);
    }
  };

  const setNombre2Value = async () => {
    if (!contract || !nombre2) return;
    
    setLoading(true);
    try {
      const result = await web3Service.sendTransaction(contract, 'setNombre2', [nombre2]);
      setLastTransaction(result);
      setResults(prev => ({
        ...prev,
        setNombre2Result: `Nombre2 mis à jour: ${nombre2}`
      }));
      await loadCurrentValues();
    } catch (error) {
      console.error('Error setting nombre2:', error);
      setResults(prev => ({
        ...prev,
        setNombre2Result: `Erreur: ${error.message}`
      }));
    } finally {
      setLoading(false);
    }
  };

  const callAddition1 = async () => {
    if (!contract) return;
    
    setLoading(true);
    try {
      const result = await web3Service.callMethod(contract, 'addition1');
      setResults(prev => ({
        ...prev,
        addition1Result: `Résultat: ${result.toString()}`
      }));
    } catch (error) {
      console.error('Error calling addition1:', error);
      setResults(prev => ({
        ...prev,
        addition1Result: `Erreur: ${error.message}`
      }));
    } finally {
      setLoading(false);
    }
  };

  const callAddition2 = async () => {
    if (!contract || !paramA || !paramB) return;
    
    setLoading(true);
    try {
      const result = await web3Service.callMethod(contract, 'addition2', [paramA, paramB]);
      setResults(prev => ({
        ...prev,
        addition2Result: `Résultat: ${paramA} + ${paramB} = ${result.toString()}`
      }));
    } catch (error) {
      console.error('Error calling addition2:', error);
      setResults(prev => ({
        ...prev,
        addition2Result: `Erreur: ${error.message}`
      }));
    } finally {
      setLoading(false);
    }
  };

  if (!contract) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600">Contrat Exercice1 non trouvé</p>
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
            Exercice 1: Somme de deux variables
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Control Panel */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Variables d'état */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Variables d'état actuelles:</h3>
                <div className="bg-gray-50 p-4 rounded">
                  <p><strong>nombre1:</strong> {results.currentNombre1 || 'Chargement...'}</p>
                  <p><strong>nombre2:</strong> {results.currentNombre2 || 'Chargement...'}</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nouveau nombre1:</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={nombre1}
                        onChange={(e) => setNombre1(e.target.value)}
                        className="flex-1 p-2 border rounded"
                        placeholder="Entrez nombre1"
                      />
                      <button
                        onClick={setNombre1Value}
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                      >
                        Modifier
                      </button>
                    </div>
                    {results.setNombre1Result && (
                      <p className="text-sm mt-1 text-green-600">{results.setNombre1Result}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Nouveau nombre2:</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={nombre2}
                        onChange={(e) => setNombre2(e.target.value)}
                        className="flex-1 p-2 border rounded"
                        placeholder="Entrez nombre2"
                      />
                      <button
                        onClick={setNombre2Value}
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                      >
                        Modifier
                      </button>
                    </div>
                    {results.setNombre2Result && (
                      <p className="text-sm mt-1 text-green-600">{results.setNombre2Result}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Fonctions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Fonctions:</h3>
                
                <div className="space-y-3">
                  <div>
                    <button
                      onClick={callAddition1}
                      disabled={loading}
                      className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 disabled:opacity-50"
                    >
                      addition1() - Fonction View
                    </button>
                    {results.addition1Result && (
                      <p className="text-sm mt-1 text-green-600">{results.addition1Result}</p>
                    )}
                  </div>

                  <div>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="number"
                        value={paramA}
                        onChange={(e) => setParamA(e.target.value)}
                        className="flex-1 p-2 border rounded"
                        placeholder="Paramètre A"
                      />
                      <input
                        type="number"
                        value={paramB}
                        onChange={(e) => setParamB(e.target.value)}
                        className="flex-1 p-2 border rounded"
                        placeholder="Paramètre B"
                      />
                    </div>
                    <button
                      onClick={callAddition2}
                      disabled={loading}
                      className="w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700 disabled:opacity-50"
                    >
                      addition2(a, b) - Fonction Pure
                    </button>
                    {results.addition2Result && (
                      <p className="text-sm mt-1 text-green-600">{results.addition2Result}</p>
                    )}
                  </div>
                </div>
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
  )
}
export default Exercice1;