import * as borsh from "borsh";
import { expect, test } from "bun:test";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { COUNTER_SIZE, schema } from "./types";

let adminAccount = Keypair.generate();
let dataAccount = Keypair.generate();

const connection = new Connection("http://127.0.0.1:8899");
const PROGRAM_ID = new PublicKey("6Mib5LvBb6aWuPqCDEFFKWK5PiKJQe8m3sHRhfW2usn2");

test("Account initiated", async() => {
    const txn = await connection.requestAirdrop(adminAccount.publicKey, 1 * LAMPORTS_PER_SOL);      // airdroping some SOL to adminAccount
    await connection.confirmTransaction(txn);

    // creating dataAccount
    const lamports = await connection.getMinimumBalanceForRentExemption(COUNTER_SIZE);

    const dataAccountInstruction = SystemProgram.createAccount({
        fromPubkey: adminAccount.publicKey, 
        lamports,
        space: COUNTER_SIZE,
        programId: PROGRAM_ID,                              // this PROGRAM_ID owns this dataAccount we are creating
        newAccountPubkey: dataAccount.publicKey,            // assigned the public key we generating at first
    });

    const dataAccountTxn = new Transaction();           // creating new transaction
    dataAccountTxn.add(dataAccountInstruction);         // adding instructions to the transaction

    const signature = await connection.sendTransaction(dataAccountTxn, [adminAccount, dataAccount]);

    await connection.confirmTransaction(signature);

    console.log(dataAccount.publicKey.toBase58());

    // read dataAccount and ensure it is empty
    const dataAccountInfo = await connection.getAccountInfo(dataAccount.publicKey);

    if (!dataAccountInfo?.data) {
        throw new Error("Account has no data");
    }

    const counter = borsh.deserialize(schema, Uint8Array.from(dataAccountInfo.data));

    console.log((counter as any).count);
    expect((counter as any).count).toBe(0);
});