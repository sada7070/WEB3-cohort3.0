import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";
import { test, expect, describe, beforeAll } from "bun:test";
import { LiteSVM } from "litesvm";

describe("Create PDA from client", () => {
    let vm: LiteSVM;
    let pda: PublicKey;
    let bump: number;
    let programId: PublicKey;
    let payer: Keypair;

    beforeAll(() => {
        vm = new LiteSVM();
        programId = PublicKey.unique();
        payer = Keypair.generate();

        vm.addProgramFromFile(programId, "./cpi.so");
        vm.airdrop(payer.publicKey, BigInt(LAMPORTS_PER_SOL * 2));
        [pda, bump] = PublicKey.findProgramAddressSync([payer.publicKey.toBuffer(), Buffer.from("user")], programId);

        let ix = new TransactionInstruction({
            keys: [
                {
                    pubkey: pda,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: payer.publicKey,
                    isSigner: true,
                    isWritable: true,
                },
                {
                    pubkey: SystemProgram.programId,
                    isSigner: false,
                    isWritable: false,
                }
            ],
            programId,
            data: Buffer.from(""),
        });

        const tx = new Transaction().add(ix);
        tx.feePayer = payer.publicKey;
        tx.recentBlockhash = vm.latestBlockhash();
        tx.sign(payer);
        vm.sendTransaction(tx);
    });

    test("should create pda", () => {
        const balance = vm.getBalance(pda);
        expect(Number(balance)).toBeGreaterThan(0);
        expect(Number(balance)).toBe(LAMPORTS_PER_SOL*1);
    })
})