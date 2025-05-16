import { Connection, PublicKey } from '@solana/web3.js';
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import { useWallet } from "@solana/wallet-adapter-react"
import { useState } from 'react';

export function QuoteSwap() {
  const [ inputMint, setInputMint ] = useState("");
  const [ outputMint, setOutputMint ] = useState("");
  const [ amount, setAmount ] = useState(0);

  const wallet = useWallet();

  const connection = new Connection('https://api.devnet-beta.solana.com');
  //const wallet = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY || ''));

  async function Swap() {
    const ipMint = new PublicKey(inputMint);
    const opMint = new PublicKey(outputMint);

    const quoteResponse = await (
      await fetch(
        `https://lite-api.jup.ag/swap/v1/quote?inputMint=${ipMint}&outputMint=${opMint}&amount=${amount}&slippageBps=50&restrictIntermediateTokens=true`
      )
    ).json();
  
    console.log(JSON.stringify(quoteResponse, null, 2));

    const swapResponse = await (
      await fetch('https://lite-api.jup.ag/swap/v1/swap', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          quoteResponse,
          userPublicKey: wallet.publicKey!,
          
          // ADDITIONAL PARAMETERS TO OPTIMIZE FOR TRANSACTION LANDING
          // See next guide to optimize for transaction landing
          dynamicComputeUnitLimit: true,
          dynamicSlippage: true,
          prioritizationFeeLamports: {
                priorityLevelWithMaxLamports: {
                  maxLamports: 1000000,
                  priorityLevel: "veryHigh"
                }
              }
          })
      })
      ).json();

      console.log(swapResponse);
  }

  return <div>
    <input type='text' placeholder='inputMint' onChange={(e) => {
      setInputMint(e.target.value);
    }} />

    <input type='text' placeholder='outputMint' onChange={(e) => {
      setOutputMint(e.target.value);
    }} />

    <input type='number' placeholder='amount' onChange={(e) => {
      setAmount(Number(e.target.value));
    }} />

    <button onClick={Swap}>Swap</button>
  </div>
}