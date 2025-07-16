// // // into
// const crypto = require('crypto');

// const input = "100xdevs";
// const hash = crypto.createHash("sha256").update(input).digest('hex');

// console.log(hash);

// /* Assignment 1
// What if I ask you the following question — Give me an input string that outputs a SHA-256 hash that starts with 00000 . How will you do it?
// */

// const crypto = require("crypto");
// let input = 0;
// for(let i = 0; i>= 0; i++) {
//     let hash = crypto.createHash('sha256').update(input.toString()).digest('hex');
//     if(hash.startsWith("00000")) {
//         console.log(input);
//         console.log(hash);
//         return;
//     }
//     input++;
// }

// /*Assignment #2
// What if I ask you that the input string should start with 100xdevs ? How would the code change?
// */

// const crypto = require('crypto');

// const prefix = "100xdevs"
// const sufix = 0;

// for(let i = 0; i >= 0; i++) {
//     let input = prefix + sufix.toString();
//     const hash = crypto.createHash('sha256').update(input).digest('hex');

//     if(hash.startsWith('00000')) {
//         console.log(input);
//         console.log(hash);
//         return;
//     }
//     sufix++;
// }

/*Assignment #3
What if I ask you to find a nonce for the following input - 
    harkirat => Raman | Rs 100
    Ram => Ankit | Rs 10
*/

const crypto = require('crypto');

const prefix =  `harkirat => Raman | Rs 100
                Ram => Ankit | Rs 10`.toString();
let sufix = 0;

for(let i = 0; i >= 0; i++) {
    let input = prefix + sufix.toString();
    const hash = crypto.createHash('sha256').update(input).digest('hex');

    if(hash.startsWith('00000')) {
        console.log(input);
        console.log(hash);
        return;
    }
    sufix++;
}