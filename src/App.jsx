import React, { useState, useCallback, Suspense } from 'react';
import { generateMnemonic } from 'bip39';
import { ethers } from 'ethers';
import Navbar from './Navbar';

const Wallet = React.lazy(() => import('./Wallet'));

function App() {
  const [mnemonic, setMnemonic] = useState('');
  const [wallets, setWallets] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const generateNewSeed = useCallback(() => {
    const newMnemonic = generateMnemonic();
    setMnemonic(newMnemonic);
    setWallets([]);
    setIsExpanded(true);
  }, []);

  const createWallet = useCallback(() => {
    if (!mnemonic) {
      alert('Please generate a seed first.');
      return;
    }

    const wallet = ethers.Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${wallets.length}`);
    const newWallet = {
      id: Date.now(),
      address: wallet.address,
      privateKey: wallet.privateKey,
      publicKey: wallet.publicKey,
      mnemonic: wallet.mnemonic.phrase,
    };

    setWallets(prevWallets => [...prevWallets, newWallet]);
  }, [mnemonic, wallets.length]);

  const handleDelete = useCallback((walletId) => {
    setWallets(prevWallets => prevWallets.filter(w => w.id !== walletId));
  }, []);

  const toggleExpansion = useCallback(() => {
    setIsExpanded(prevIsExpanded => !prevIsExpanded);
  }, []);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(mnemonic).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  }, [mnemonic]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="p-6 flex flex-col items-center justify-start">
        <div className="flex flex-col items-center sm:flex-row sm:space-x-4 mb-4">
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            onClick={generateNewSeed}
          >
            New Seed
          </button>
          {mnemonic && (
            <button 
              className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-lg flex items-center mt-4 sm:mt-0"
              onClick={toggleExpansion}
            >
              {isExpanded ? '▲' : '▼'}
            </button>
          )}
        </div>

        {mnemonic && (
          <div 
            className={`transition-all duration-500 ease-in-out ${
              isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}
          >
            <div className="grid grid-cols-3 gap-4 bg-gray-800 p-6 rounded-lg">
              {mnemonic.split(' ').map((word, index) => (
                <div key={index} className="bg-gray-700 p-3 rounded text-center">
                  {word}
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center mt-4">
              <button 
                className="flex items-center text-gray-400 hover:text-gray-200"
                onClick={copyToClipboard}
              >
                <span className="mr-2 text-xl">📋</span>
                <span>Copy Seed Phrase</span>
              </button>
              {copySuccess && (
                <div className="text-green-500 mt-2 transition-opacity duration-500 ease-in-out">
                  Copied to clipboard!
                </div>
              )}
            </div>
          </div>
        )}

        {mnemonic && (
          <div className="flex justify-center mt-6">
            <button 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
              onClick={createWallet}
            >
              Create Wallet
            </button>
          </div>
        )}

        <div className="wallets-container w-full mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Suspense fallback={<div>Loading wallets...</div>}>
            {wallets.map((wallet, index) => (
              <Wallet
                key={wallet.id}
                index={index}
                wallet={wallet}
                onDelete={() => handleDelete(wallet.id)}
              />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;
