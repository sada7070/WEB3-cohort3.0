import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export function ShowSolBalance() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [ balance, setBalance ] = useState(0);

    useEffect(() => {
        async function getBalance() {
            if(wallet.publicKey) {
                setBalance(await connection.getBalance(wallet.publicKey));
            }
        }

        getBalance();
    },[connection, wallet.publicKey]);

    return <div className="mt-8">
        <p className="text-white">SOL Balance: {balance/LAMPORTS_PER_SOL}</p>
    </div>
}