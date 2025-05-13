import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export function RequestAirdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();

    const[amount, setAmount] = useState(0);


    async function requestAirdrop() {
        const publicKey = wallet.publicKey;
        await connection.requestAirdrop(publicKey!, amount * LAMPORTS_PER_SOL);           // 1 SOL = 10^9 lamports
        alert("Airdropped " + amount + " SOL to " + publicKey!.toBase58());
    }

    return <div className="flex gap-6">
        <input onChange={(e) => {
            setAmount(Number(e.target.value));
        }} type="text" placeholder="Amount..." className="text-white border-2 rounded-xl pl-2" />

        <button onClick={requestAirdrop} className="border-2 text-white bg-blue-500 rounded-full p-2 cursor-pointer">Request Airdrop</button>
    </div>
}   