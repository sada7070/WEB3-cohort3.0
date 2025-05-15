import { useState } from 'react'
import { PublicKey } from '@solana/web3.js'
import './App.css'
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';

function App() {
  const [ userAddress, setUserAddress ] = useState("");
  const [ tokenMintAddress, setTokenMintAddress ] = useState("");

  async function getAssociatedTokenAddress () {
    try {
      const userPubKey = new PublicKey(userAddress);
      const mintPubKey = new PublicKey(tokenMintAddress);

      const getAssociatedTokenAddress = () => {
        return PublicKey.findProgramAddressSync(
          [
            userPubKey.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            mintPubKey.toBuffer()
          ],
          ASSOCIATED_TOKEN_PROGRAM_ID
        );
      }

      const [ associatedTokenAddress, bump ] = getAssociatedTokenAddress();
      alert(`Associated Token Address: ${associatedTokenAddress.toBase58()}, bump: ${bump}`);

    } catch(e) {
      console.error("Error: ", e);
      alert(`Error: ${e}`);
    }
  }

  return <div>
    <input onChange={(e) => {
      setUserAddress(e.target.value);
    }} type='text' placeholder='Enter the user public key' />

    <input onChange={(e) => {
      setTokenMintAddress(e.target.value);
    }} type='text' placeholder='Token mint address' />

    <button onClick={getAssociatedTokenAddress}>Submit</button>
  </div>
}

export default App
