import React, { useState, memo } from 'react';

const Wallet = memo(({ index, wallet, onDelete }) => {
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [showMnemonic, setShowMnemonic] = useState(false);

  const togglePrivateKeyVisibility = () => setShowPrivateKey(!showPrivateKey);
  const toggleMnemonicVisibility = () => setShowMnemonic(!showMnemonic);

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-md mb-6 w-full transition-transform transform hover:scale-105 hover:shadow-lg duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Wallet {index + 1}</h2>
        <button 
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500 transition-colors duration-300"
        >
          🗑️
        </button>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500">Public Key:</p>
        <p className="bg-gray-800 p-3 rounded-lg mt-1 text-sm break-all font-mono">
          {wallet.publicKey}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500">Private Key:</p>
        <div className="bg-gray-800 p-3 rounded-lg mt-1 text-sm flex justify-between items-center font-mono">
          <span className="break-all flex-1">
            {showPrivateKey ? wallet.privateKey : '•'.repeat(64)}
          </span>
          <button 
            onClick={togglePrivateKeyVisibility}
            className="ml-3 text-gray-400 hover:text-gray-200 transition-colors duration-300 flex-shrink-0"
          >
            {showPrivateKey ? '🙈' : '👁️'}
          </button>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500">Secret Phrase:</p>
        <div className="bg-gray-800 p-3 rounded-lg mt-1 text-sm flex justify-between items-center font-mono">
          <span className="break-all flex-1">
            {showMnemonic ? wallet.mnemonic : '•'.repeat(24)}
          </span>
          <button 
            onClick={toggleMnemonicVisibility}
            className="ml-3 text-gray-400 hover:text-gray-200 transition-colors duration-300 flex-shrink-0"
          >
            {showMnemonic ? '🙈' : '👁️'}
          </button>
        </div>
      </div>
    </div>
  );
});

export default Wallet;
