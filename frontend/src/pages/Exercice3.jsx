import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import web3Service from '../services/web3Service';
import BlockchainInfo from '../components/BlockchainInfo';
import TransactionInfo from '../components/TransactionInfo';

const Exercice3 = () => {
  const [contract, setContract] = useState(null);
  const [currentMessage, setCurrentMessage] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [string1, setString1] = useState('Solidity');
  const [string2, setString2] = useState('et ReactJS');
  const [concatenateWith, setConcatenateWith] = useState('');
  const [lengthString, setLengthString] = useState('');
  const [compareString1, setCompareString1] = useState('');
  const [compareString2, setCompareString2] = useState('');
  const [results, setResults] = useState({});
  const [lastTransaction, setLastTransaction] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const contractInstance = web3Service.getContract('Exercice3');
    setContract(contractInstance);
    if (contractInstance) {
      loadCurrentMessage();
    }
  }, []);

  const loadCurrentMessage = async () => {
    if (!contract) return;
    
    try {
      const message = await web3Service.callMethod(contract, 'getMessage');
      setCurrentMessage(message);
    } catch (error) {
      console.error('Error loading current message:', error);
    }
  };

  const updateMessage = async () => {
    if (!contract || !newMessage) return;
    
    setLoading(true);
    try {
      const result = await web3Service.sendTransaction(contract, 'setMessage', [newMessage]);
      setLastTransaction(result);
      setResults(prev => ({
        ...prev,
        setMessageResult: `Message mis à jour: "${newMessage}"`
      }));
      await loadCurrentMessage();
    } catch (error) {
      console.error('Error setting message:', error);
      setResults(prev => ({
        ...prev,
        setMessageResult: `Erreur: ${error.message}`
      }));
    } finally {
      setLoading(false);
    }
  };

  const concatenateStrings = async () => {
    if (!contract || !string1 || !string2) return;
    
    setLoading(true);
    try {
      const result = await web3Service.callMethod(contract, 'concatener', [string1, string2]);
      setResults(prev => ({
        ...prev,
        concatenateResult: `"${string1}" + "${string2}" = "${result}"`
      }));
    } catch (error) {
      console.error('Error concatenating strings:', error);
      setResults(prev => ({
        ...prev,
        concatenateResult: `Erreur: ${error.message}`
      }));
    } finally {
      setLoading(false);
    }
  };

  const concatenateWithMessage = async () => {
    if (!contract || !concatenateWith) return;
    
    setLoading(true);
    try {
      const result = await web3Service.callMethod(contract, 'concatenerAvec', [concatenateWith]);
      setResults(prev => ({
        ...prev,
        concatenateWithResult: `Message + "${concatenateWith}" = "${result}"`
      }));
    } catch (error) {
      console.error('Error concatenating with message:', error);
      setResults(prev => ({
        ...prev,
        concatenateWithResult: `Erreur: ${error.message}`
      }));
    } finally {
      setLoading(false);
    }
  };

  const getStringLength = async () => {
    if (!contract || !lengthString) return;
    
    setLoading(true);
    try {
      const result = await web3Service.callMethod(contract, 'longueur', [lengthString]);
      setResults(prev => ({
        ...prev,
        lengthResult: `Longueur de "${lengthString}": ${result.toString()} caractères`
      }));
    } catch (error) {
      console.error('Error getting string length:', error);
      setResults(prev => ({
        ...prev,
        lengthResult: `Erreur: ${error.message}`
      }));
    } finally {
      setLoading(false);
    }
  };

  const compareStrings = async () => {
    if (!contract || !compareString1 || !compareString2) return;
    
    setLoading(true);
    try {
      const result = await web3Service.callMethod(contract, 'comparer', [compareString1, compareString2]);
      const comparison = result ? 'IDENTIQUES' : 'DIFFÉRENTES';
      setResults(prev => ({
        ...prev,
        compareResult: `Les deux chaînes "${compareString1}" et "${compareString2}" sont ${comparison}.`
      }));
    } catch (error) {
      console.error('Error comparing strings:', error);
      setResults(prev => ({
        ...prev,
        compareResult: `Erreur: ${error.message}`
      }));
    } finally {
      setLoading(false);
    }
  };

  if (!contract) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600">Contrat Exercice3 non trouvé</p>
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
            Exercice 3: Traitement des chaînes de caractères
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Control Panel */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            {/* Current Message */}
            <div className="mb-6 bg-gray-50 p-4 rounded">
              <h3 className="text-lg font-semibold mb-2">Message actuel:</h3>
              <p className="text-gray-700 italic">"{currentMessage}"</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Set Message */}
                <div>
                  <h4 className="font-semibold mb-2">Modifier le message:</h4>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 p-2 border rounded"
                      placeholder="Nouveau message"
                    />
                    <button
                      onClick={updateMessage}
                      disabled={loading}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                      Modifier
                    </button>
                  </div>
                  {results.setMessageResult && (
                    <p className="text-sm mt-1 text-green-600">{results.setMessageResult}</p>
                  )}
                </div>

                {/* Concatenate */}
                <div>
                  <h4 className="font-semibold mb-2">Concaténer deux chaînes:</h4>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={string1}
                        onChange={(e) => setString1(e.target.value)}
                        className="flex-1 p-2 border rounded"
                        placeholder="Chaîne 1"
                      />
                      <input
                        type="text"
                        value={string2}
                        onChange={(e) => setString2(e.target.value)}
                        className="flex-1 p-2 border rounded"
                        placeholder="Chaîne 2"
                      />
                    </div>
                    <button
                      onClick={concatenateStrings}
                      disabled={loading}
                      className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:opacity-50"
                    >
                      Concaténer
                    </button>
                    {results.concatenateResult && (
                      <p className="text-sm text-green-600">{results.concatenateResult}</p>
                    )}
                  </div>
                </div>

                {/* Concatenate with message */}
                <div>
                  <h4 className="font-semibold mb-2">Concaténer avec le message:</h4>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={concatenateWith}
                      onChange={(e) => setConcatenateWith(e.target.value)}
                      className="flex-1 p-2 border rounded"
                      placeholder="Texte à ajouter"
                    />
                    <button
                      onClick={concatenateWithMessage}
                      disabled={loading}
                      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
                    >
                      Ajouter
                    </button>
                  </div>
                  {results.concatenateWithResult && (
                    <p className="text-sm mt-1 text-green-600">{results.concatenateWithResult}</p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* String Length */}
                <div>
                  <h4 className="font-semibold mb-2">Longueur d'une chaîne:</h4>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={lengthString}
                      onChange={(e) => setLengthString(e.target.value)}
                      className="flex-1 p-2 border rounded"
                      placeholder="Chaîne à mesurer"
                    />
                    <button
                      onClick={getStringLength}
                      disabled={loading}
                      className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 disabled:opacity-50"
                    >
                      Mesurer
                    </button>
                  </div>
                  {results.lengthResult && (
                    <p className="text-sm mt-1 text-green-600">{results.lengthResult}</p>
                  )}
                </div>

                {/* Compare Strings */}
                <div>
                  <h4 className="font-semibold mb-2">Comparer deux chaînes:</h4>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={compareString1}
                      onChange={(e) => setCompareString1(e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Première chaîne"
                    />
                    <input
                      type="text"
                      value={compareString2}
                      onChange={(e) => setCompareString2(e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Deuxième chaîne"
                    />
                    <button
                      onClick={compareStrings}
                      disabled={loading}
                      className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 disabled:opacity-50"
                    >
                      Comparer
                    </button>
                    {results.compareResult && (
                      <div className="bg-yellow-100 p-2 rounded">
                        <p className="text-yellow-800 font-medium">{results.compareResult}</p>
                      </div>
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
  );
};

export default Exercice3;