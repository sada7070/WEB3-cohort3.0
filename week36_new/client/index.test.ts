import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import {test, expect} from "bun:test";
import { LiteSVM } from "litesvm";

test("creating data account", () => {
    const svm = new LiteSVM();
    const contractPubkey = PublicKey.unique();

    // loading our contract to the svm
    svm.addProgramFromFile(contractPubkey, "./double.so");

    const payer = new Keypair();
    const dataAccount = new Keypair();
    svm.airdrop(payer.publicKey, BigInt(LAMPORTS_PER_SOL));

    const blockhash = svm.latestBlockhash();

    const ixs = SystemProgram.createAccount({
        fromPubkey: payer.publicKey,
        newAccountPubkey: dataAccount.publicKey,
        lamports: Number(svm.minimumBalanceForRentExemption(BigInt(4))),
        space: 4,
        programId: contractPubkey,
    });

    const txn = new Transaction();
    txn.add(ixs);

    txn.recentBlockhash = blockhash;
    txn.feePayer = payer.publicKey;
    txn.sign(payer, dataAccount);

    svm.sendTransaction(txn);

    const intialBalance = svm.getBalance(dataAccount.publicKey);
    expect(intialBalance).toBe(svm.minimumBalanceForRentExemption(BigInt(4)));
})