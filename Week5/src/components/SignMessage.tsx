import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react"
import { useState } from "react";
import bs58 from "bs58";

export function SignMessage() {
    const [ message, setMessage ] = useState("");
    const wallet = useWallet();

    async function onClick() {
        if(!wallet.publicKey || !wallet.signMessage) {
            alert("Unauthorized.");
            return;
        }
        try {
            const encodedMessage = new TextEncoder().encode(message);
            const signature = await wallet.signMessage!(encodedMessage);
            
            if(!ed25519.verify(signature, encodedMessage, wallet.publicKey!.toBytes())) {
                alert('Message signature invalid!');
                return;
            }
            alert(`Success. Message signature: ${bs58.encode(signature)}`);
        } catch(err) {
            console.error("Error: ", err);
        }
    }

    return <div>
        <input onChange={(e) => {
            setMessage(e.target.value);
        }} type="text" placeholder="Eneter your message..." className="border-2 border-white text-amber-50 p-2 rounded-xl mx-5" />
        <button onClick={onClick} className="border-2 rounded-xl text-xl bg-blue-500 text-white px-6 py-1 ml-5 cursor-pointer mt-10">Send</button>
    </div>
}