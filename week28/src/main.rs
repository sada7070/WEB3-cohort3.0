// package manager(cargo)

// use chrono::{Utc, Local};
// use dotenv::dotenv;
// use std::env;

// fn main() {
//     let utc = Utc::now();
//     let local = Local::now();

//     println!("UTC time: {}", utc);
//     println!("Local time: {}", local);


//     // dotenv
//     dotenv().ok();          // initializing dotenv

//     let db_url_result = env::var("DATABASE_URL");

//     match db_url_result {
//         Ok(str) => println!("{}", str),
//         Err(e) => println!("{}", e)
//     }
// }

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------

// // generics and trait bounds

// fn main() {
//     println!("{}", sum(1.0, 2.0));
// //    println!("{}", sum(true, false));               // trait bound telling clearly that Add ops cannot be done on bool


//     print_variable(1);
//     print_variable(2.0);
//     print_variable("sada");


//     println!("{}",biggest_num(1, 3));
// }

// fn sum<T: std::ops::Add<Output = T>>(a: T, b: T) -> T {
//     return a + b;
// }

// fn print_variable<T: std::fmt::Display>(a: T) {
//     println!("{}", a);
// }

// fn biggest_num<T: Ord>(x: T, y: T) -> T {
//     if x > y {
//         return x;
//     }
//     return y;
// }

// -------------------------------------------------------------------------------------------------------------------------------------------------------

// generics over structs

struct Rect<T> {
    width: T,
    height: T,
}

impl<T: std::ops::Mul<Output = T> + Copy> Rect<T> {
    fn area(&self) -> T {
        return self.width * self.height;
    }
}

fn main() {
    let r = Rect {
        width: 1.0,
        height: 4.0,
    };

    println!("{}", r.area());
}