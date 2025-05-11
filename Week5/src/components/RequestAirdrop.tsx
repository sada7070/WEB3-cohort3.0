import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export function RequestAirdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();

    const[amount, setAmount] = useState("");


    function requestAirdrop() {
        const publicKey = wallet.publicKey;
        connection.requestAirdrop(publicKey!, Number(amount) * LAMPORTS_PER_SOL);           // 1 SOL = 10^9 lamports
    }

    return <div className="flex gap-6">
        <input onChange={(e) => {
            setAmount(e.target.value);
        }} type="text" placeholder="Amount..." className="text-white border-2 rounded-xl pl-2" />

        <button onClick={requestAirdrop} className="border-2 text-white bg-blue-500 rounded-full p-2 cursor-pointer">Request Airdrop</button>
    </div>
}