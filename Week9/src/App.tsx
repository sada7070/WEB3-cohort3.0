import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { QuoteSwap } from "./components/QuoteSwap"

function App() {
  return <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
    <WalletProvider wallets={[]} autoConnect>
      <WalletModalProvider>
        <QuoteSwap />
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
}

export default App