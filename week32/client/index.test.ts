import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import * as borsh from "borsh";
import { expect, test } from "bun:test";
import { COUNTER_SIZE, schema } from "./types";

let adminAccount = Keypair.generate();
let dataAccount = Keypair.generate();

let connection = new Connection("http://127.0.0.1:8899");
let PROGRAM_ID = new PublicKey("6fQJ1gSJrHT2ENd96hcGW1DsaBUV99DADYiuUvCoAko1");

test("account intiate", async() => {
    const txn = await connection.requestAirdrop(adminAccount.publicKey, 1 * LAMPORTS_PER_SOL);
    await connection.confirmTransaction(txn);

    const lamports = await connection.getMinimumBalanceForRentExemption(COUNTER_SIZE);

    const dataAccountInstruction = SystemProgram.createAccount({
        fromPubkey: adminAccount.publicKey,
        newAccountPubkey: dataAccount.publicKey,
        lamports,
        space: COUNTER_SIZE,
        programId: PROGRAM_ID,
    });

    const dataAccountTxn = new Transaction();
    dataAccountTxn.add(dataAccountInstruction);

    const signature = await connection.sendTransaction(dataAccountTxn, [adminAccount, dataAccount]);
    await connection.confirmTransaction(signature);

    console.log(dataAccount.publicKey.toBase58());

    // read dataAccount and ensure it is empty
    const dataAccountInfo =  await connection.getAccountInfo(dataAccount.publicKey);
    const counter = borsh.deserialize(schema, dataAccountInfo?.data);

    console.log(counter?.count);
    expect(counter?.count).toBe(0);
});