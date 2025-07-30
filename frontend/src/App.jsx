import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import web3Service from './services/web3Service';
import { CONTRACT_ADDRESSES } from './contracts/contractAddresses';
import { getABI } from './contracts/contractABIs';

// Import components
import Home from './pages/Home';
import Exercice1 from './pages/Exercice1';
import Exercice2 from './pages/Exercice2';
import Exercice3 from './pages/Exercice3';
import Exercice4 from './pages/Exercice4';
import Exercice5 from './pages/Exercice5';
import Exercice6 from './pages/Exercice6';
import Exercice7 from './pages/Exercice7';
import Exercice8 from './pages/Exercice8';

function App() {
  const [web3Loaded, setWeb3Loaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initWeb3();
  }, []);

  const initWeb3 = async () => {
    try {
      const success = await web3Service.init();
      if (success) {
        // Load all contracts
        await loadContracts();
        setWeb3Loaded(true);
      } else {
        console.error('Web3 initialization failed');
      }
    } catch (error) {
      console.error('Error initializing Web3:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadContracts = async () => {
    const contractNames = [
      'Exercice1', 'Exercice2', 'Exercice3', 'Exercice4',
      'Exercice5', 'Exercice6', 'Exercice7', 'Exercice8'
    ];

    for (const name of contractNames) {
      const address = CONTRACT_ADDRESSES[name];
      const abi = getABI(name);
      
      if (address && abi.length > 0) {
        await web3Service.loadContract(name, abi, address);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg">Chargement de l'application...</p>
          <p className="text-sm text-gray-600">Connexion à la blockchain...</p>
        </div>
      </div>
    );
  }

  if (!web3Loaded) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur de connexion</h1>
          <p className="text-gray-700 mb-4">
            Impossible de se connecter à la blockchain.
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Assurez-vous que:
          </p>
          <ul className="text-left text-sm text-gray-600 mb-4">
            <li>• Ganache est démarré (port 7545)</li>
            <li>• MetaMask est installé et configuré</li>
            <li>• Les contrats sont déployés</li>
          </ul>
          <button
            onClick={initWeb3}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercice1" element={<Exercice1 />} />
        <Route path="/exercice2" element={<Exercice2 />} />
        <Route path="/exercice3" element={<Exercice3 />} />
        <Route path="/exercice4" element={<Exercice4 />} />
        <Route path="/exercice5" element={<Exercice5 />} />
        <Route path="/exercice6" element={<Exercice6 />} />
        <Route path="/exercice7" element={<Exercice7 />} />
        <Route path="/exercice8" element={<Exercice8 />} />
      </Routes>
    </div>
  );
}

export default App;