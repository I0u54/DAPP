import React from 'react';

const TransactionInfo = ({ lastTransaction }) => {
  if (!lastTransaction) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg mt-4">
        <h3 className="text-lg font-bold mb-2">Détails de la dernière transaction</h3>
        <p className="text-gray-500">Aucune transaction effectuée</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg mt-4">
      <h3 className="text-lg font-bold mb-4">Détails de la dernière transaction</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <div className="mb-2">
            <strong>Hash de la transaction:</strong>
            <div className="bg-white p-2 rounded mt-1 font-mono text-xs break-all">
              {lastTransaction.transactionHash}
            </div>
          </div>
          
          <div className="mb-2">
            <strong>Bloc:</strong>
            <div className="bg-white p-2 rounded mt-1">
              #{lastTransaction.blockNumber}
            </div>
          </div>
          
          <div className="mb-2">
            <strong>Index de la transaction:</strong>
            <div className="bg-white p-2 rounded mt-1">
              {lastTransaction.transactionIndex}
            </div>
          </div>
          
          <div className="mb-2">
            <strong>De:</strong>
            <div className="bg-white p-2 rounded mt-1 font-mono text-xs break-all">
              {lastTransaction.from}
            </div>
          </div>
          
          <div className="mb-2">
            <strong>Vers:</strong>
            <div className="bg-white p-2 rounded mt-1 font-mono text-xs break-all">
              {lastTransaction.to}
            </div>
          </div>
        </div>
        
        <div>
          <div className="mb-2">
            <strong>Gas utilisé:</strong>
            <div className="bg-white p-2 rounded mt-1">
              {lastTransaction.gasUsed ? lastTransaction.gasUsed.toString() : 'N/A'}
            </div>
          </div>
          
          <div className="mb-2">
            <strong>Prix du gas:</strong>
            <div className="bg-white p-2 rounded mt-1">
              {lastTransaction.gasPrice ? lastTransaction.gasPrice.toString() : 'N/A'} Wei
            </div>
          </div>
          
          <div className="mb-2">
            <strong>Valeur:</strong>
            <div className="bg-white p-2 rounded mt-1">
              {lastTransaction.value ? `${lastTransaction.value} ETH` : '0 ETH'}
            </div>
          </div>
          
          <div className="mb-2">
            <strong>Statut:</strong>
            <div className={`p-2 rounded mt-1 ${
              lastTransaction.status === '0x1' || lastTransaction.status === true 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {lastTransaction.status === '0x1' || lastTransaction.status === true ? 'Succès' : 'Échec'}
            </div>
          </div>
          
          <div className="mb-2">
            <strong>Nonce:</strong>
            <div className="bg-white p-2 rounded mt-1">
              {lastTransaction.nonce || 'N/A'}
            </div>
          </div>
        </div>
      </div>
      
      {lastTransaction.logs && lastTransaction.logs.length > 0 && (
        <div className="mt-4">
          <strong>Événements émis:</strong>
          <div className="bg-white p-2 rounded mt-1 max-h-32 overflow-y-auto">
            <pre className="text-xs">{JSON.stringify(lastTransaction.logs, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionInfo;