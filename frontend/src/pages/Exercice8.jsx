import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import web3Service from '../services/web3Service';
import BlockchainInfo from '../components/BlockchainInfo';
import TransactionInfo from '../components/TransactionInfo';

const Exercice8 = () => {
  const [contract, setContract] = useState(null);
  const [contractBalance, setContractBalance] = useState('0');
  const [recipient, setRecipient] = useState('');
  const [currentAccount, setCurrentAccount] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [newRecipient, setNewRecipient] = useState('');
  const [results, setResults] = useState({});
  const [lastTransaction, setLastTransaction] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const contractInstance = web3Service.getContract('Exercice8');
    setContract(contractInstance);
    if (contractInstance) {
      loadContractData();
    }
  }, []);

  const loadContractData = async () => {
    if (!contract) return;
    
    try {
      // Get contract balance
      const balance = await web3Service.web3.eth.getBalance(contract.options.address);
      setContractBalance(web3Service.web3.utils.fromWei(balance, 'ether'));
      
      // Get recipient address
      const recipientAddr = await web3Service.callMethod(contract, 'recipient');
      setRecipient(recipientAddr);
      
      // Get current account
      const accounts = await web3Service.web3.eth.getAccounts();
      setCurrentAccount(accounts[0]);
      
    } catch (error) {
      console.error('Error loading contract data:', error);
    }
  };

  const sendPayment = async () => {
    if (!contract || !paymentAmount || parseFloat(paymentAmount) <= 0) return;
    
    setLoading(true);
    try {
      const weiAmount = web3Service.web3.utils.toWei(paymentAmount, 'ether');
      const result = await web3Service.sendTransaction(
        contract, 
        'receivePayment', 
        [], 
        weiAmount
      );
      
      setLastTransaction(result);
      setResults(prev => ({
        ...prev,
        paymentResult: `Paiement de ${paymentAmount} ETH envoyé avec succès!`
      }));
      
      // Reload contract data
      await loadContractData();
      setPaymentAmount('');
    } catch (error) {
      console.error('Error sending payment:', error);
      setResults(prev => ({
        ...prev,
        paymentResult: `Erreur: ${error.message}`
      }));
    } finally {
      setLoading(false);
    }
  };

  const withdrawFunds = async () => {
    if (!contract) return;
    
    setLoading(true);
    try {
      const result = await web3Service.sendTransaction(contract, 'withdraw');
      setLastTransaction(result);
      setResults(prev => ({
        ...prev,
        withdrawResult: `Retrait effectué avec succès! Tous les fonds ont été transférés au destinataire.`
      }));
      
      // Reload contract data
      await loadContractData();
    } catch (error) {
      console.error('Error withdrawing funds:', error);
      setResults(prev => ({
        ...prev,
        withdrawResult: `Erreur: ${error.message}`
      }));
    } finally {
      setLoading(false);
    }
  };

  const changeRecipient = async () => {
    if (!contract || !newRecipient) return;
    
    setLoading(true);
    try {
      const result = await web3Service.sendTransaction(
        contract, 
        'changeRecipient', 
        [newRecipient]
      );
      
      setLastTransaction(result);
      setResults(prev => ({
        ...prev,
        changeRecipientResult: `Destinataire changé avec succès vers: ${newRecipient}`
      }));
      
      // Reload contract data
      await loadContractData();
      setNewRecipient('');
    } catch (error) {
      console.error('Error changing recipient:', error);
      setResults(prev => ({
        ...prev,
        changeRecipientResult: `Erreur: ${error.message}`
      }));
    } finally {
      setLoading(false);
    }
  };

  const getSender = async () => {
    if (!contract) return;
    
    setLoading(true);
    try {
      const sender = await web3Service.callMethod(contract, 'getSender');
      setResults(prev => ({
        ...prev,
        senderResult: `Adresse de l'expéditeur (msg.sender): ${sender}`
      }));
    } catch (error) {
      console.error('Error getting sender:', error);
      setResults(prev => ({
        ...prev,
        senderResult: `Erreur: ${error.message}`
      }));
    } finally {
      setLoading(false);
    }
  };

  const getBalance = async () => {
    if (!contract) return;
    
    setLoading(true);
    try {
      const balance = await web3Service.callMethod(contract, 'getBalance');
      const balanceInEth = web3Service.web3.utils.fromWei(balance.toString(), 'ether');
      setResults(prev => ({
        ...prev,
        balanceResult: `Solde du contrat: ${balanceInEth} ETH (${balance.toString()} Wei)`
      }));
    } catch (error) {
      console.error('Error getting balance:', error);
      setResults(prev => ({
        ...prev,
        balanceResult: `Erreur: ${error.message}`
      }));
    } finally {
      setLoading(false);
    }
  };

  // Quick payment amounts
  const quickPayments = ['0.01', '0.1', '0.5', '1'];

  if (!contract) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600">Contrat Exercice8 non trouvé</p>
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
            Exercice 8: Utilisation des variables globales (msg.sender et msg.value)
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Contract Status */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">État du contrat de paiement:</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Solde du contrat</h4>
                <p className="text-2xl font-bold text-blue-600">{contractBalance} ETH</p>
                <p className="text-sm text-blue-600">
                  {web3Service.web3 && web3Service.web3.utils.toWei(contractBalance, 'ether')} Wei
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Destinataire</h4>
                <p className="text-sm font-mono text-green-600 break-all">{recipient}</p>
                <p className="text-xs text-green-600 mt-1">
                  {currentAccount === recipient ? '✅ Vous êtes le destinataire' : '❌ Vous n\'êtes pas le destinataire'}
                </p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">Votre compte</h4>
                <p className="text-sm font-mono text-yellow-600 break-all">{currentAccount}</p>
                <p className="text-xs text-yellow-600 mt-1">Compte connecté</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">Contrat</h4>
                <p className="text-sm font-mono text-purple-600 break-all">{contract.options.address}</p>
                <p className="text-xs text-purple-600 mt-1">Adresse du contrat</p>
              </div>
            </div>
          </div>

          {/* Operations Panel */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Payment Operations */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-600">Opérations de paiement</h3>
                
                {/* Send Payment */}
                <div className="bg-blue-50 p-4 rounded">
                  <h4 className="font-semibold mb-3">Envoyer un paiement:</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Montant (ETH):</label>
                      <input
                        type="number"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="0.01"
                        step="0.01"
                        min="0.001"
                      />
                    </div>
                    
                    {/* Quick Payment Buttons */}
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Montants rapides:</p>
                      <div className="grid grid-cols-4 gap-2">
                        {quickPayments.map((amount) => (
                          <button
                            key={amount}
                            onClick={() => setPaymentAmount(amount)}
                            className="text-sm bg-gray-200 hover:bg-gray-300 p-1 rounded"
                          >
                            {amount} ETH
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <button
                      onClick={sendPayment}
                      disabled={loading || !paymentAmount || parseFloat(paymentAmount) <= 0}
                      className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                      💰 Envoyer le paiement
                    </button>
                    
                    {results.paymentResult && (
                      <p className="text-sm text-green-600">{results.paymentResult}</p>
                    )}
                  </div>
                </div>

                {/* Withdraw Funds */}
                <div className="bg-red-50 p-4 rounded">
                  <h4 className="font-semibold mb-3">Retirer les fonds:</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    ⚠️ Seul le destinataire peut retirer les fonds du contrat.
                  </p>
                  <button
                    onClick={withdrawFunds}
                    disabled={loading || parseFloat(contractBalance) === 0}
                    className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700 disabled:opacity-50"
                  >
                    🏦 Retirer tous les fonds ({contractBalance} ETH)
                  </button>
                  
                  {results.withdrawResult && (
                    <p className="text-sm text-green-600 mt-2">{results.withdrawResult}</p>
                  )}
                </div>
              </div>

              {/* Management Operations */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-600">Gestion du contrat</h3>
                
                {/* Change Recipient */}
                <div className="bg-green-50 p-4 rounded">
                  <h4 className="font-semibold mb-3">Changer le destinataire:</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    ⚠️ Seul le destinataire actuel peut changer l'adresse.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Nouvelle adresse:</label>
                      <input
                        type="text"
                        value={newRecipient}
                        onChange={(e) => setNewRecipient(e.target.value)}
                        className="w-full p-2 border rounded font-mono text-sm"
                        placeholder="0x..."
                      />
                    </div>
                    
                    <button
                      onClick={changeRecipient}
                      disabled={loading || !newRecipient}
                      className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 disabled:opacity-50"
                    >
                      🔄 Changer le destinataire
                    </button>
                    
                    {results.changeRecipientResult && (
                      <p className="text-sm text-green-600">{results.changeRecipientResult}</p>
                    )}
                  </div>
                </div>

                {/* Information Functions */}
                <div className="bg-yellow-50 p-4 rounded">
                  <h4 className="font-semibold mb-3">Fonctions d'information:</h4>
                  <div className="space-y-2">
                    <button
                      onClick={getSender}
                      disabled={loading}
                      className="w-full bg-yellow-600 text-white p-2 rounded hover:bg-yellow-700 disabled:opacity-50"
                    >
                      👤 Obtenir msg.sender
                    </button>
                    
                    <button
                      onClick={getBalance}
                      disabled={loading}
                      className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700 disabled:opacity-50"
                    >
                      💵 Vérifier le solde
                    </button>
                  </div>
                  
                  {results.senderResult && (
                    <p className="text-sm text-yellow-600 mt-2">{results.senderResult}</p>
                  )}
                  {results.balanceResult && (
                    <p className="text-sm text-orange-600 mt-2">{results.balanceResult}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Variables Globales Info */}
            <div className="mt-6 bg-purple-50 p-4 rounded border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">ℹ️ Variables globales utilisées:</h4>
              <div className="text-sm text-purple-700 space-y-2">
                <div>
                  <p><strong>msg.sender:</strong> Adresse de l'utilisateur qui appelle la fonction</p>
                  <p className="ml-2">→ Utilisé pour vérifier les permissions (withdraw, changeRecipient)</p>
                </div>
                <div>
                  <p><strong>msg.value:</strong> Montant en Wei envoyé avec la transaction</p>
                  <p className="ml-2">→ Utilisé dans receivePayment() pour accepter des paiements</p>
                  <p className="ml-2">→ Nécessite le modificateur 'payable'</p>
                </div>
                <div>
                  <p><strong>address(this).balance:</strong> Solde du contrat en Wei</p>
                  <p className="ml-2">→ Utilisé pour transférer tous les fonds lors du retrait</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 bg-gray-50 p-4 rounded">
              <h4 className="font-semibold mb-2">Actions rapides:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <button
                  onClick={loadContractData}
                  disabled={loading}
                  className="text-sm bg-gray-600 text-white p-2 rounded hover:bg-gray-700 disabled:opacity-50"
                >
                  🔄 Actualiser
                </button>
                <button
                  onClick={() => setPaymentAmount('0.05')}
                  disabled={loading}
                  className="text-sm bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  💰 0.05 ETH
                </button>
                <button
                  onClick={() => setNewRecipient(currentAccount)}
                  disabled={loading}
                  className="text-sm bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  👤 Mon adresse
                </button>
                <button
                  onClick={() => setResults({})}
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

export default Exercice8;