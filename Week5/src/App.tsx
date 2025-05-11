import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import { RequestAirdrop } from './components/RequestAirDrop';

function App() {
  return (
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                  <div className='flex flex-col justify-center items-center min-h-screen bg-zinc-900'>
                    <div>
                      <WalletMultiButton /> 
                    </div>
                    
                    <div className='mt-8'>
                      <RequestAirdrop />
                    </div>
                  </div>
                </WalletModalProvider>
            </WalletProvider>   
      </ConnectionProvider>
  )   
}

export default App
