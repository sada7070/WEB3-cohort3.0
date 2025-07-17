// use std::fmt::{Debug, Display};

// #[derive(Debug)]                        // debug macro

// struct User {
//     username: String,
//     age: i32,
// }

// impl Display for User {
//     fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
//         write!(f, "This is user struct with age {}", self.age)
//     }
// }

// // impl Debug for User {                                                                            // implementing debug with using macro(here using debug trait)
// //     fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
// //         write!(f, "This is user struct with age {}, name {}", self.age, self.username)
// //     }
// // }

// fn main() {
//     let user1 = User {
//         username: String::from("Sada"),
//         age: 23,
//     };

//     println!("name: {}, age: {}", user1.username, user1.age);
//     println!("{}", user1);          // Display
//     println!("{:?}", user1);        // Debug =>(:?)
// }




// copy, clone in marco

#[derive(Debug, Clone, Copy)]
struct User {
    alive: bool,
    age: i32,
}

fn main() {
    let user1 = User {
        alive: true,
        age: 23,
    };

    let user2 = user1;                  // works cuz of copy and clone(works on simple datatype, will not work on strings)

    println!("{:?}, {:?}", user1, user2);
}