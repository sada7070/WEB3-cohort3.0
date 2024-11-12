// Creating a public/private keypair (code is correct but not working in js file, need to debug)

/* 
STEPS
    1) create a private key
    2) create a public key from using private key
    3) define a message to sign and convert it to UInt8Array
    4) sign the message using private key
    5) verify the message using the public key
*/

import * as ed from "@noble/ed25519";

async function main() {
    // step1
    const privKey = ed.utils.randomPrivateKey();

    // step2
    const pubKey = await ed.getPublicKeyAsync(privKey);

    // stpe3(here message is 'hi there')
    const message = new TextEncoder().encode("hi there");

    // step4
    const signature = await ed.signAsync(message, privKey);

    // step5
    const isValid = await ed.verifyAsync(signature, message, pubKey);

    // output the result
    console.log(isValid);
}
main();