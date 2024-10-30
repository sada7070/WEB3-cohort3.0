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
const byteArray = asciiToBytes(ascii);
console.log(byteArray); // Output: Uint8Array(5) [72, 101, 108, 108, 111]