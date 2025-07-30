import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import web3Service from '../services/web3Service';
import BlockchainInfo from '../components/BlockchainInfo';
import TransactionInfo from '../components/TransactionInfo';

const Exercice2 = () => {
  const [contract, setContract] = useState(null);
  const [etherAmount, setEtherAmount] = useState('');
  const [weiAmount, setWeiAmount] = useState('');
  const [results, setResults] = useState({});
  const [lastTransaction, setLastTransaction] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const contractInstance = web3Service.getContract('Exercice2');
    setContract(contractInstance);
  }, []);

  const convertEtherToWei = async () => {
    if (!contract || !etherAmount) return;
    
    setLoading(true);
    try {
      const result = await web3Service.callMethod(contract, 'etherEnWei', [etherAmount]);
      setResults(prev => ({
        ...prev,
        etherToWeiResult: `${etherAmount} ETH = ${result.toString()} Wei`
      }));
    } catch (error) {
      console.error('Error converting Ether to Wei:', error);
      setResults(prev => ({
        ...prev,
        etherToWeiResult: `Erreur: ${error.message}`
      }));
    } finally {
      setLoading(false);
    }
  };

  const convertWeiToEther = async () => {
    if (!contract || !weiAmount) return;
    
    setLoading(true);
    try {
      const result = await web3Service.callMethod(contract, 'weiEnEther', [weiAmount]);
      setResults(prev => ({
        ...prev,
        weiToEtherResult: `${weiAmount} Wei = ${result.toString()} ETH`
      }));
    } catch (error) {
      console.error('Error converting Wei to Ether:', error);
      setResults(prev => ({
        ...prev,
        weiToEtherResult: `Erreur: ${error.message}`
      }));
    } finally {
      setLoading(false);
    }
  };

  if (!contract) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600">Contrat Exercice2 non trouvé</p>
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
            Exercice 2: Conversion des cryptomonnaies
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Control Panel */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ether to Wei */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-600">Ether vers Wei</h3>
                <div className="bg-blue-50 p-4 rounded">
                  <p className="text-sm text-gray-600 mb-3">
                    1 ETH = 10<sup>18</sup> Wei = 1,000,000,000,000,000,000 Wei
                  </p>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Montant en Ether:</label>
                      <input
                        type="number"
                        value={etherAmount}
                        onChange={(e) => setEtherAmount(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Entrez le montant en ETH"
                        step="0.001"
                      />
                    </div>
                    <button
                      onClick={convertEtherToWei}
                      disabled={loading || !etherAmount}
                      className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                      Convertir ETH → Wei
                    </button>
                    {results.etherToWeiResult && (
                      <div className="bg-green-100 p-3 rounded">
                        <p className="text-green-800 font-medium">{results.etherToWeiResult}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Wei to Ether */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-purple-600">Wei vers Ether</h3>
                <div className="bg-purple-50 p-4 rounded">
                  <p className="text-sm text-gray-600 mb-3">
                    1 Wei = 10<sup>-18</sup> ETH = 0.000000000000000001 ETH
                  </p>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Montant en Wei:</label>
                      <input
                        type="number"
                        value={weiAmount}
                        onChange={(e) => setWeiAmount(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Entrez le montant en Wei"
                        step="1"
                      />
                    </div>
                    <button
                      onClick={convertWeiToEther}
                      disabled={loading || !weiAmount}
                      className="w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700 disabled:opacity-50"
                    >
                      Convertir Wei → ETH
                    </button>
                    {results.weiToEtherResult && (
                      <div className="bg-green-100 p-3 rounded">
                        <p className="text-green-800 font-medium">{results.weiToEtherResult}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Examples */}
            <div className="mt-6 bg-gray-50 p-4 rounded">
              <h4 className="font-semibold mb-2">Exemples de conversion:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>1 ETH</strong> = 1,000,000,000,000,000,000 Wei</p>
                  <p><strong>0.1 ETH</strong> = 100,000,000,000,000,000 Wei</p>
                  <p><strong>0.001 ETH</strong> = 1,000,000,000,000,000 Wei</p>
                </div>
                <div>
                  <p><strong>1,000,000,000,000,000,000 Wei</strong> = 1 ETH</p>
                  <p><strong>500,000,000,000,000,000 Wei</strong> = 0.5 ETH</p>
                  <p><strong>1,000,000,000,000,000 Wei</strong> = 0.001 ETH</p>
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

export default Exercice2;