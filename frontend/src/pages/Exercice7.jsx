import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import web3Service from '../services/web3Service';
import BlockchainInfo from '../components/BlockchainInfo';
import TransactionInfo from '../components/TransactionInfo';

const Exercice7 = () => {
  const [contract, setContract] = useState(null);
  const [rectangleAddress, setRectangleAddress] = useState('');
  const [rectangleData, setRectangleData] = useState({});
  const [createParams, setCreateParams] = useState({
    x: '0',
    y: '0',
    longueur: '10',
    largeur: '5'
  });
  const [moveParams, setMoveParams] = useState({
    dx: '0',
    dy: '0'
  });
  const [dimensionParams, setDimensionParams] = useState({
    longueur: '10',
    largeur: '5'
  });
  const [results, setResults] = useState({});
  const [lastTransaction, setLastTransaction] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const contractInstance = web3Service.getContract('Exercice7');
    setContract(contractInstance);
    if (contractInstance) {
      loadRectangleAddress();
    }
  }, []);

  const loadRectangleAddress = async () => {
    if (!contract) return;
    
    try {
      const address = await web3Service.callMethod(contract, 'getRectangleAddress');
      setRectangleAddress(address);
      if (address && address !== '0x0000000000000000000000000000000000000000') {
        await loadRectangleData(address);
      }
    } catch (error) {
      console.error('Error loading rectangle address:', error);
    }
  };

  const loadRectangleData = async (address = rectangleAddress) => {
    if (!address || address === '0x0000000000000000000000000000000000000000') return;
    
    try {
      // Create a contract instance for the Rectangle
      const rectangleABI = [
        {
          "inputs": [],
          "name": "x",
          "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "y",
          "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "lo",
          "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "la",
          "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "surface",
          "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "afficheInfos",
          "outputs": [{"internalType": "string", "name": "", "type": "string"}],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "afficheXY",
          "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}, {"internalType": "uint256", "name": "", "type": "uint256"}],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "afficheLoLa",
          "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}, {"internalType": "uint256", "name": "", "type": "uint256"}],
          "stateMutability": "view",
          "type": "function"
        }
      ];
      
      const rectangleContract = new web3Service.web3.eth.Contract(rectangleABI, address);
      
      const x = await rectangleContract.methods.x().call();
      const y = await rectangleContract.methods.y().call();
      const lo = await rectangleContract.methods.lo().call();
      const la = await rectangleContract.methods.la().call();
      const surface = await rectangleContract.methods.surface().call();
      const infos = await rectangleContract.methods.afficheInfos().call();
      
      setRectangleData({
        x: x.toString(),
        y: y.toString(),
        longueur: lo.toString(),
        largeur: la.toString(),
        surface: surface.toString(),
        infos
      });
    } catch (error) {
      console.error('Error loading rectangle data:', error);
    }
  };

  const createNewRectangle = async () => {
    if (!contract) return;
    
    setLoading(true);
    try {
      const result = await web3Service.sendTransaction(
        contract, 
        'creerRectangle', 
        [createParams.x, createParams.y, createParams.longueur, createParams.largeur]
      );
      setLastTransaction(result);
      setResults(prev => ({
        ...prev,
        createResult: `Nouveau rectangle créé: Position(${createParams.x}, ${createParams.y}), Dimensions(${createParams.longueur} × ${createParams.largeur})`
      }));
      
      // Reload rectangle data
      await loadRectangleAddress();
    } catch (error) {
      console.error('Error creating rectangle:', error);
      setResults(prev => ({
        ...prev,
        createResult: `Erreur: ${error.message}`
      }));
    } finally {
      setLoading(false);
    }
  };

  const moveRectangle = async () => {
    if (!rectangleAddress || rectangleAddress === '0x0000000000000000000000000000000000000000') return;
    
    setLoading(true);
    try {
      // Call deplacerForme directly on the rectangle contract
      const rectangleABI = [
        {
          "inputs": [
            {"internalType": "uint256", "name": "dx", "type": "uint256"},
            {"internalType": "uint256", "name": "dy", "type": "uint256"}
          ],
          "name": "deplacerForme",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];
      
      const rectangleContract = new web3Service.web3.eth.Contract(rectangleABI, rectangleAddress);
      const result = await web3Service.sendTransaction(
        rectangleContract, 
        'deplacerForme', 
        [moveParams.dx, moveParams.dy]
      );
      
      setLastTransaction(result);
      setResults(prev => ({
        ...prev,
        moveResult: `Rectangle déplacé vers la position (${moveParams.dx}, ${moveParams.dy})`
      }));
      
      // Reload rectangle data
      await loadRectangleData();
    } catch (error) {
      console.error('Error moving rectangle:', error);
      setResults(prev => ({
        ...prev,
        moveResult: `Erreur: ${error.message}`
      }));
    } finally {
      setLoading(false);
    }
  };

  const updateDimensions = async () => {
    if (!rectangleAddress || rectangleAddress === '0x0000000000000000000000000000000000000000') return;
    
    setLoading(true);
    try {
      const rectangleABI = [
        {
          "inputs": [
            {"internalType": "uint256", "name": "_longueur", "type": "uint256"},
            {"internalType": "uint256", "name": "_largeur", "type": "uint256"}
          ],
          "name": "setDimensions",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];
      
      const rectangleContract = new web3Service.web3.eth.Contract(rectangleABI, rectangleAddress);
      const result = await web3Service.sendTransaction(
        rectangleContract, 
        'setDimensions', 
        [dimensionParams.longueur, dimensionParams.largeur]
      );
      
      setLastTransaction(result);
      setResults(prev => ({
        ...prev,
        dimensionResult: `Dimensions mises à jour: ${dimensionParams.longueur} × ${dimensionParams.largeur}`
      }));
      
      // Reload rectangle data
      await loadRectangleData();
    } catch (error) {
      console.error('Error updating dimensions:', error);
      setResults(prev => ({
        ...prev,
        dimensionResult: `Erreur: ${error.message}`
      }));
    } finally {
      setLoading(false);
    }
  };

  if (!contract) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600">Contrat Exercice7 non trouvé</p>
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
            Exercice 7: Programmation Orientée Objet (Formes géométriques)
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Current Rectangle Display */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Rectangle actuel:</h3>
            
            {rectangleAddress && rectangleAddress !== '0x0000000000000000000000000000000000000000' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Rectangle Info */}
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-semibold mb-3">Informations du rectangle:</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Adresse du contrat:</strong> <span className="font-mono text-xs">{rectangleAddress}</span></p>
                    <p><strong>Position X:</strong> {rectangleData.x || 'Chargement...'}</p>
                    <p><strong>Position Y:</strong> {rectangleData.y || 'Chargement...'}</p>
                    <p><strong>Longueur:</strong> {rectangleData.longueur || 'Chargement...'}</p>
                    <p><strong>Largeur:</strong> {rectangleData.largeur || 'Chargement...'}</p>
                    <p><strong>Surface:</strong> {rectangleData.surface || 'Chargement...'} unités²</p>
                    <p><strong>Type:</strong> {rectangleData.infos || 'Chargement...'}</p>
                  </div>
                </div>

                {/* Visual Representation */}
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-semibold mb-3">Représentation visuelle:</h4>
                  <div className="relative bg-white border-2 border-gray-300 h-48 overflow-hidden">
                    {rectangleData.x !== undefined && (
                      <div
                        className="absolute bg-blue-500 opacity-70 border-2 border-blue-700"
                        style={{
                          left: `${Math.min(parseInt(rectangleData.x) * 2, 80)}%`,
                          top: `${Math.min(parseInt(rectangleData.y) * 2, 60)}%`,
                          width: `${Math.min(parseInt(rectangleData.longueur) * 3, 100)}px`,
                          height: `${Math.min(parseInt(rectangleData.largeur) * 3, 80)}px`,
                        }}
                      >
                        <div className="text-white text-xs p-1">
                          {rectangleData.longueur}×{rectangleData.largeur}
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-1 left-1 text-xs text-gray-500">
                      Position: ({rectangleData.x}, {rectangleData.y})
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Aucun rectangle créé</p>
            )}
          </div>

          {/* Control Panel */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Create Rectangle */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-600">Créer un nouveau rectangle</h3>
                <div className="bg-blue-50 p-4 rounded">
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium mb-1">Position X:</label>
                        <input
                          type="number"
                          value={createParams.x}
                          onChange={(e) => setCreateParams(prev => ({...prev, x: e.target.value}))}
                          className="w-full p-2 border rounded"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Position Y:</label>
                        <input
                          type="number"
                          value={createParams.y}
                          onChange={(e) => setCreateParams(prev => ({...prev, y: e.target.value}))}
                          className="w-full p-2 border rounded"
                          min="0"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium mb-1">Longueur:</label>
                        <input
                          type="number"
                          value={createParams.longueur}
                          onChange={(e) => setCreateParams(prev => ({...prev, longueur: e.target.value}))}
                          className="w-full p-2 border rounded"
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Largeur:</label>
                        <input
                          type="number"
                          value={createParams.largeur}
                          onChange={(e) => setCreateParams(prev => ({...prev, largeur: e.target.value}))}
                          className="w-full p-2 border rounded"
                          min="1"
                        />
                      </div>
                    </div>
                    <button
                      onClick={createNewRectangle}
                      disabled={loading}
                      className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                      Créer Rectangle
                    </button>
                    {results.createResult && (
                      <p className="text-sm text-green-600">{results.createResult}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Move Rectangle */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-600">Déplacer le rectangle</h3>
                <div className="bg-green-50 p-4 rounded">
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium mb-1">Nouvelle X:</label>
                        <input
                          type="number"
                          value={moveParams.dx}
                          onChange={(e) => setMoveParams(prev => ({...prev, dx: e.target.value}))}
                          className="w-full p-2 border rounded"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Nouvelle Y:</label>
                        <input
                          type="number"
                          value={moveParams.dy}
                          onChange={(e) => setMoveParams(prev => ({...prev, dy: e.target.value}))}
                          className="w-full p-2 border rounded"
                          min="0"
                        />
                      </div>
                    </div>
                    <button
                      onClick={moveRectangle}
                      disabled={loading || !rectangleAddress || rectangleAddress === '0x0000000000000000000000000000000000000000'}
                      className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:opacity-50"
                    >
                      Déplacer
                    </button>
                    {results.moveResult && (
                      <p className="text-sm text-green-600">{results.moveResult}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Update Dimensions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-purple-600">Modifier les dimensions</h3>
                <div className="bg-purple-50 p-4 rounded">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Nouvelle longueur:</label>
                      <input
                        type="number"
                        value={dimensionParams.longueur}
                        onChange={(e) => setDimensionParams(prev => ({...prev, longueur: e.target.value}))}
                        className="w-full p-2 border rounded"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Nouvelle largeur:</label>
                      <input
                        type="number"
                        value={dimensionParams.largeur}
                        onChange={(e) => setDimensionParams(prev => ({...prev, largeur: e.target.value}))}
                        className="w-full p-2 border rounded"
                        min="1"
                      />
                    </div>
                    <button
                      onClick={updateDimensions}
                      disabled={loading || !rectangleAddress || rectangleAddress === '0x0000000000000000000000000000000000000000'}
                      className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 disabled:opacity-50"
                    >
                      Modifier
                    </button>
                    {results.dimensionResult && (
                      <p className="text-sm text-green-600">{results.dimensionResult}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Information Panel */}
            <div className="mt-6 bg-yellow-50 p-4 rounded border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">ℹ️ Architecture des contrats:</h4>
              <div className="text-sm text-yellow-700 space-y-2">
                <div>
                  <p><strong>Contrat abstrait Forme:</strong></p>
                  <p className="ml-2">→ Variables: x, y (coordonnées)</p>
                  <p className="ml-2">→ Fonctions: deplacerForme(), afficheXY(), afficheInfos() virtuelle, surface() virtuelle</p>
                </div>
                <div>
                  <p><strong>Contrat Rectangle (hérite de Forme):</strong></p>
                  <p className="ml-2">→ Variables supplémentaires: lo (longueur), la (largeur)</p>
                  <p className="ml-2">→ Implémente: surface() = lo × la, afficheInfos() = "Je suis Rectangle"</p>
                  <p className="ml-2">→ Fonction supplémentaire: afficheLoLa()</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 bg-gray-50 p-4 rounded">
              <h4 className="font-semibold mb-2">Actions rapides:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <button
                  onClick={loadRectangleData}
                  disabled={loading}
                  className="text-sm bg-gray-600 text-white p-2 rounded hover:bg-gray-700 disabled:opacity-50"
                >
                  🔄 Actualiser
                </button>
                <button
                  onClick={() => {
                    setCreateParams({x: '5', y: '3', longueur: '15', largeur: '8'});
                  }}
                  disabled={loading}
                  className="text-sm bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  📋 Exemple 1
                </button>
                <button
                  onClick={() => {
                    setMoveParams({dx: '10', dy: '10'});
                  }}
                  disabled={loading}
                  className="text-sm bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  ↗️ Déplacer (10,10)
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

export default Exercice7;