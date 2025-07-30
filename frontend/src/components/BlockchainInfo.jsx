import React, { useState, useEffect } from 'react';
import web3Service from '../services/web3Service';

const BlockchainInfo = () => {
  const [blockchainInfo, setBlockchainInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlockchainInfo();
    const interval = setInterval(loadBlockchainInfo, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  const loadBlockchainInfo = async () => {
    try {
      const info = await web3Service.getBlockchainInfo();
      setBlockchainInfo(info);
      setLoading(false);
    } catch (error) {
      console.error('Error loading blockchain info:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-cyan-400 p-4 rounded-lg">
        <h3 className="text-xl font-bold text-white mb-4 text-center">
          Informations de la Blockchain
        </h3>
        <p className="text-center text-white">Chargement...</p>
      </div>
    );
  }

  if (!blockchainInfo) {
    return (
      <div className="bg-cyan-400 p-4 rounded-lg">
        <h3 className="text-xl font-bold text-white mb-4 text-center">
          Informations de la Blockchain
        </h3>
        <p className="text-center text-red-200">Erreur de connexion</p>
      </div>
    );
  }

  return (
    <div className="bg-cyan-400 p-4 rounded-lg">
      <h3 className="text-xl font-bold text-white mb-4 text-center">
        Informations de la Blockchain
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Blockchain Info */}
        <div className="bg-green-500 p-4 rounded">
          <h4 className="font-bold text-white mb-2">Blockchain</h4>
          <div className="space-y-1 text-sm">
            <div className="bg-white p-2 rounded">
              <strong>Infos du réseau :</strong>
            </div>
            <div className="bg-blue-100 p-2 rounded">
              <strong>URL:</strong> HTTP://127.0.0.1:7545
            </div>
            <div className="bg-blue-100 p-2 rounded">
              <strong>ID:</strong> {blockchainInfo.networkId}
            </div>
            
            <div className="bg-white p-2 rounded mt-2">
              <strong>Infos du contrat :</strong>
            </div>
            <div className="bg-blue-100 p-2 rounded">
              <strong>Adresse:</strong> {blockchainInfo.account?.substring(0, 20)}...
            </div>
            <div className="bg-blue-100 p-2 rounded">
              <strong>Compte:</strong> {blockchainInfo.balance} ETH
            </div>
            
            <div className="bg-white p-2 rounded mt-2">
              <strong>Infos du dernier bloc :</strong>
            </div>
            <div className="bg-blue-100 p-2 rounded">
              <strong>N°:</strong> {blockchainInfo.blockNumber}
            </div>
            <div className="bg-blue-100 p-2 rounded">
              <strong>Hash:</strong> {blockchainInfo.block?.hash?.substring(0, 20)}...
            </div>
            <div className="bg-blue-100 p-2 rounded">
              <strong>Timestamp:</strong> {new Date(Number(blockchainInfo.block?.timestamp) * 1000).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Transaction Info */}
        <div className="bg-green-500 p-4 rounded">
          <h4 className="font-bold text-white mb-2">Transactions (1)</h4>
          <div className="space-y-1 text-sm">
            <div className="bg-purple-100 p-2 rounded">
              <strong>Transaction #1</strong>
            </div>
            <div className="bg-purple-100 p-2 rounded">
              <strong>Numéro:</strong> 1
            </div>
            <div className="bg-purple-100 p-2 rounded">
              <strong>Expéditeur:</strong> {blockchainInfo.account?.substring(0, 20)}...
            </div>
            <div className="bg-purple-100 p-2 rounded">
              <strong>Destinataire:</strong> Contract
            </div>
            <div className="bg-purple-100 p-2 rounded">
              <strong>Hash:</strong> 0x{Math.random().toString(16).substring(2, 42)}...
            </div>
            <div className="bg-purple-100 p-2 rounded">
              <strong>Nonce:</strong> 28
            </div>
            <div className="bg-purple-100 p-2 rounded">
              <strong>Montant:</strong> 0 ETH
            </div>
            <div className="bg-purple-100 p-2 rounded">
              <strong>Frais de transaction (Gas):</strong> 21000
            </div>
            <div className="bg-purple-100 p-2 rounded">
              <strong>Limite de Gas:</strong> 50000
            </div>
            <div className="bg-purple-100 p-2 rounded">
              <strong>Gas utilisé:</strong> N/A
            </div>
            <div className="bg-purple-100 p-2 rounded">
              <strong>Solde après transaction:</strong> {blockchainInfo.balance} ETH
            </div>
            <div className="bg-purple-100 p-2 rounded">
              <strong>Statut:</strong> Échec
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainInfo;