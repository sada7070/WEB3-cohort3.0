// macros

// // declarative macro

// macro_rules! say_hello {            // we are building 'say_hello' which is a custom macro
//     () => {
//         println!("Hello world!!");
//     };
// }
// fn main() {
//     say_hello!();                   // first say_hello macro expands and then println macro expands
// }


// procedural macro

use std::fmt::Display;
#[derive(Debug)]            // there is no Display macro

struct User {
    username: String,
    password: String,
    age: u32,
}

// manually implementing display trait
impl Display for User {     // this is 'Display' trait
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "This is user age {}", self.age)
    }
}

fn main() {
    let u = User {
        username: String::from("Sada"),
        password: String::from("sada123"),
        age: 23,
    };

    println!("{:?}", u);
    println!("{}", u);
}