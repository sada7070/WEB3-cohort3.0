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

// // Borsh

// use borsh::{BorshDeserialize, BorshSerialize};

// #[derive(Debug, BorshSerialize, BorshDeserialize)]

// struct User {
//     username: String,
//     password:String,
// }

// fn main() {
//     let u = User {
//         username: String::from("Sada"),
//         password: String::from("12324"),
//     };

//     let mut v: Vec<u8> = Vec::new();                            // vector to store serialized bytes

//     let ans = u.serialize(&mut v);   // serialization

//     match ans {
//         Ok(_) => println!("{:?}", v),
//         Err(e) => println!("{}", e),
//     }

//     let user = User::try_from_slice(&v);    // deserialization

//     match user {
//         Ok(_) => println!("{:?}", user),
//         Err(e) => println!("{}", e),
//     }
// }


// ----------------------------------------------------------------------------------------------------------------------------------------------------------

// Lifetimes

fn main() {
    let str1 = String::from("Sada");
    let ans;
    {
        let str2= String::from("");
        ans = longest_string(&str1,  &str2);
        println!("{}", ans);
    }
    //println!("{}", ans);                              // can not use 'ans' here even if it has scope here because str2 dont have scope here 
}

fn longest_string<'a>(s1: &'a String, s2: &'a String) -> &'a String {       // specifying lifetime of both string is 'a and compiler will select string with less scope among them
    if s1.len() > s2.len() {
        return s1;
    }
    s2
}