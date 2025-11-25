// // Serde(serialization & decerialization)

// use serde::{Deserialize, Serialize, de};

// #[derive(Debug, Serialize, Deserialize)]

// struct User {
//     username: String,
//     password: String,
// }

// fn main() {
//     // serializeation
//     let u = User {
//         username: String::from("Sada"),
//         password: String::from("123abc"),
//     };
//     let serialized_string = serde_json::to_string(&u);

//     match serialized_string {
//         Ok(str) => println!("{}", str),
//         Err(e) => println!("{}", e),
//     }

//     //decerialization
//     let s = String::from("{\"username\": \"Sada\", \"password\": \"123fjan\"}");
//     let decerailized_string: Result<User, serde_json::Error> = serde_json::from_str(&s);

//     match decerailized_string {
//         Ok(json) => println!("{:?}", json),
//         Err(e) => println!("{}", e),
//     }
// }


// -----------------------------------------------------------------------------------------------------------------------------------------------------------

// Borsh

use borsh::{BorshDeserialize, BorshSerialize};

#[derive(Debug, BorshSerialize, BorshDeserialize)]

struct User {
    username: String,
    password:String,
}

fn main() {
    let u = User {
        username: String::from("Sada"),
        password: String::from("12324"),
    };

    let mut v: Vec<u8> = Vec::new();                            // vector to store serialized bytes

    let ans = u.serialize(&mut v);   // serialization

    match ans {
        Ok(_) => println!("{:?}", v),
        Err(e) => println!("{}", e),
    }

    let user = User::try_from_slice(&v);    // deserialization

    match user {
        Ok(_) => println!("{:?}", user),
        Err(e) => println!("{}", e),
    }
}