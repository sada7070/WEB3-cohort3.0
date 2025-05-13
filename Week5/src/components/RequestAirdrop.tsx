import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export function RequestAirdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [amount, setAmount] = useState(0);

    async function requestAirdrop() {
        if (!wallet.connected || !wallet.publicKey) {
            alert("Wallet not connected.");
            return;
        }

        try {
            const sig = await connection.requestAirdrop(
                wallet.publicKey,
                amount * LAMPORTS_PER_SOL
            );

            await connection.confirmTransaction(sig, "confirmed");

            alert(`✅ Airdropped ${amount} SOL to ${wallet.publicKey.toBase58()}`);
        } catch (err: any) {
            console.error("Airdrop failed:", err);
            alert("❌ Airdrop failed: " + (err.message || err));
        }
    }

    return (
        <div className="flex gap-6">
            <input
                onChange={(e) => setAmount(Number(e.target.value))}
                type="number"
                placeholder="Amount..."
                className="text-white border-2 rounded-xl pl-2"
            />
            <button
                onClick={requestAirdrop}
                className="border-2 text-white bg-blue-500 rounded-2xl p-2 px-4 cursor-pointer"
            >
                Request Airdrop
            </button>
        </div>
    );
}
