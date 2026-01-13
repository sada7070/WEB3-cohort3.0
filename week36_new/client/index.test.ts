import { Keypair, LAMPORTS_PER_SOL, PublicKey, Struct, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";
import {test, expect} from "bun:test";
import { LiteSVM } from "litesvm";
import * as borsh from "borsh";

class CounterState {
    count: number;

    constructor(count: number) {
        this.count = count;
    }
}

const schema = new Map([
    [CounterState, {
        kind: "struct",
        fields: [
            ["count", "u32"],
        ],
    }],
]);

test("creating data account", () => {
    const svm = new LiteSVM();                                              // creating small solana VM
    const contractPubkey = PublicKey.unique();

    // loading our contract to the svm
    svm.addProgramFromFile(contractPubkey, "./double.so");                  // deploying code to the VM

    const payer = new Keypair();
    const dataAccount = new Keypair();
    svm.airdrop(payer.publicKey, BigInt(LAMPORTS_PER_SOL));

    const ixs = SystemProgram.createAccount({
        fromPubkey: payer.publicKey,
        newAccountPubkey: dataAccount.publicKey,
        lamports: Number(svm.minimumBalanceForRentExemption(BigInt(4))),
        space: 4,
        programId: contractPubkey,
    });

    const txn = new Transaction();
    txn.add(ixs);
    txn.feePayer = payer.publicKey;

    const blockhash = svm.latestBlockhash();
    txn.recentBlockhash = blockhash;

    txn.sign(payer, dataAccount);
    svm.sendTransaction(txn);

    const intialBalance = svm.getBalance(dataAccount.publicKey);
    expect(intialBalance).toBe(svm.minimumBalanceForRentExemption(BigInt(4)));


        
});

