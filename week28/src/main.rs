use chrono::{Utc, Local};
use dotenv::dotenv;
use std::env;

fn main() {
    let utc = Utc::now();
    let local = Local::now();

    println!("UTC time: {}", utc);
    println!("Local time: {}", local);


    // dotenv
    dotenv().ok();          // initializing dotenv

    let db_url_result = env::var("DATABASE_URL");

    match db_url_result {
        Ok(str) => println!("{}", str),
        Err(e) => println!("{}", e)
    }
}
