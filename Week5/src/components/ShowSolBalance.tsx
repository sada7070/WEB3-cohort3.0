import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export function ShowSolBalance() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [balance, setBalance] = useState<number | null>(null);

    useEffect(() => {
        if (!wallet.connected || !wallet.publicKey) {
            setBalance(null);
            return;
        }

        const getBalance = async () => {
            try {
                const lamports = await connection.getBalance(wallet.publicKey!);
                setBalance(lamports);
            } catch (err) {
                console.error("Failed to get balance:", err);
                setBalance(null);
            }
        };

        getBalance();
    }, [connection, wallet.connected, wallet.publicKey]);

    return (
        <div className="mt-10">
            <p className="text-white text-2xl">
                {wallet.connected
                    ? balance !== null
                        ? `Balance: ${(balance / LAMPORTS_PER_SOL).toFixed(4)} SOL`
                        : "Loading..."
                    : "Wallet not connected"}
            </p>
        </div>
    );
}
