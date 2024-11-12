// encoding and decoding

// UInt8Array to ascii
function bytesToAscii(byteArray) {
  return new TextDecoder().decode(byteArray);
}
// Example usage:
const bytes = new Uint8Array([72, 101, 108, 108, 111]); // Corresponds to "Hello"
const asciiString = bytesToAscii(bytes);
console.log(asciiString); // Output: "Hello"


// Ascii to UInt8Array
function asciiToBytes(asciiString) {
  return new Uint8Array([...asciiString].map((char) => char.charCodeAt(0)));
}
// Example usage:
const ascii = "Hello";
const byteArr = asciiToBytes(ascii);
console.log(byteArr); // Output: Uint8Array(5) [72, 101, 108, 108, 111]

// Array to hex
function arrayToHex(byteArray) {
  let hexString = '';
  for (let i = 0; i < byteArray.length; i++) {
    hexString += byteArray[i].toString(16).padStart(2, '0');
  }
  return hexString;
}
// Example usage:
const byteArray = new Uint8Array([72, 101, 108, 108, 111]); // Corresponds to "Hello"
const hexString = arrayToHex(byteArray);
console.log(hexString); // Output: "48656c6c6f"

//Hex to array
function hexToArray(hexString) {
  const byteArray = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < byteArray.length; i++) {
    byteArray[i] = parseInt(hexString.substr(i * 2, 2), 16);
  }
  return byteArray;
}
// Example usage:
const hex = "48656c6c6f";
const byteArrayFromHex = hexToArray(hex);
console.log(byteArrayFromHex); // Output: Uint8Array(5) [72, 101, 108, 108, 111]

// Base64
const uint8Array = new Uint8Array([72, 101, 108, 108, 111]);
const base64Encoded = Buffer.from(uint8Array).toString("base64");
console.log(base64Encoded);

// Base58 encode
const bs58encode = require('bs58').default;
function uint8ArrayToBase58(uint8Array) {
  return bs58encode.encode(uint8Array);
}
// Example usage:
const byteArray58 = new Uint8Array([72, 101, 108, 108, 111]); // Corresponds to "Hello"
const base58String = uint8ArrayToBase58(byteArray58);
console.log(base58String); // Output: Base58 encoded string

// Base58 decode
const bs58decode = require('bs58').default;
function base58ToUint8Array(base58String) {
  return bs58decode.decode(base58String);
}
// Example usage:
const base58 = base58String; // Use the previously encoded Base58 string
const byteArrayFromBase58 = base58ToUint8Array(base58);
console.log(byteArrayFromBase58); // Output: Uint8Array(5) [72, 101, 108, 108, 111]