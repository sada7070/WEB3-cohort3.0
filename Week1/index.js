const crypto = require("crypto");

// hashing for the given input
const input = "100xdevs";
const hash = crypto.createHash("sha256").update(input).digest('hex');
console.log(hash);

// Give me an input string that outputs a SHA-256 hash that starts with "00000" and prefix can be anything.
for(let i = 0; i >= 0; i++) {
    const prefix = "harkirat => Raman | Rs 100 Ram => Ankit | Rs 10";
    let sufix = i.toString();
    let  input = prefix + sufix;
    const hash = crypto.createHash("sha256").update(input.toString()).digest('hex');
    if (hash.startsWith("00000")) {
        console.log(input);
        console.log(hash);
        break;
    }
}