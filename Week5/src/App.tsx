import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import { RequestAirdrop } from './components/RequestAirdrop';
import { ShowSolBalance } from './components/ShowSolBalance';
import { SendTokens } from './components/SendTokens';

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
                    <SendTokens />
                    <ShowSolBalance />
                  </div>
                </WalletModalProvider>
            </WalletProvider>   
      </ConnectionProvider>
  )   
}

export default App
