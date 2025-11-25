// Serde(serialization & decerialization)

use serde::{Deserialize, Serialize, de};

#[derive(Debug, Serialize, Deserialize)]

struct User {
    username: String,
    password: String,
}

fn main() {
    // serializeation
    let u = User {
        username: String::from("Sada"),
        password: String::from("123abc"),
    };
    let serialized_string = serde_json::to_string(&u);

    match serialized_string {
        Ok(str) => println!("{}", str),
        Err(e) => println!("{}", e),
    }

    //decerialization
    let s = String::from("{\"username\": \"Sada\", \"password\": \"123fjan\"}");
    let decerailized_string: Result<User, serde_json::Error> = serde_json::from_str(&s);

    match decerailized_string {
        Ok(json) => println!("{:?}", json),
        Err(e) => println!("{}", e),
    }
}
