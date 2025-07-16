import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";

export function SendTokens() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [ toAddress, setToAddress ] = useState<PublicKey | null>(null);
    const [ amount, setAmount ] = useState(0);

    async function sendToken() {
        if (!wallet.connected || !wallet.publicKey) {
            alert("Please connect your wallet.");
            return;
        }

        const { blockhash } = await connection.getLatestBlockhash("finalized");

        const transaction = new Transaction({
            recentBlockhash: blockhash,
            feePayer: wallet.publicKey,
        });

        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey!,
            toPubkey: toAddress!,
            lamports: amount * LAMPORTS_PER_SOL,
        }));

        await wallet.sendTransaction(transaction, connection);
        alert("Sent" + amount + " SOL to" + toAddress);
    }

    return <div className="mt-10">
        <p className="text-4xl text-white font-bold pb-4">Transfer :</p>
        <input onChange={(e) => {
            setToAddress(new PublicKey(e.target.value));
        }} type="text" placeholder="Recipient Public key" className="border-2 border-white text-amber-50 p-2 rounded-xl mr-5" />

        <input onChange={(e) => {
            setAmount(Number(e.target.value));
        }} type="number" placeholder="Amount of SOL" className="border-2 border-white text-amber-50 p-2 rounded-xl mx-5" />

        <button onClick={sendToken} className="border-2 rounded-xl text-xl bg-blue-500 text-white px-6 py-1 ml-5 cursor-pointer">Send</button>
    </div>
}