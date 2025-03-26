/*
EdDSA - Edwards-curve Digital Signature Algorithm  - ED25519
Using @noble/ed25519
*/

import * as ed from "@noble/ed25519";

async function main() {
    // generate private key
    const private_key = ed.utils.randomPrivateKey();

    // generate public key
    const public_key = await ed.getPublicKeyAsync(private_key);

    // convert the message(here 'hello_world!') into Unit8Array.
    const message = new TextEncoder().encode("hello_world!");

    // sign the message using private_key
    const signature = await ed.signAsync(message, private_key);

    // verify the signature
    const is_valid = await ed.verifyAsync(signature, message, public_key);

    // output
    console.log(is_valid);          // output is 'true' if the signature is valid.
}

main();