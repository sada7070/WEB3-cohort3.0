fn main() {
    let str = String::from("Sada");

    let str_len = length(&str);             // borrowing 'str' rather than transfering ownership

    println!("{}", str_len);
    println!("{}", str);


        let mut s1 = String::from("Sada");
        let s2 = &mut s1;
        //let s3 = &s1;                       // when one mut variable is borrowed, it cannot be borrowed again for anything(you can borrow immutable variable for anytime we want)

        println!("{}", s2);
    }

fn length(s: &String) -> usize {
    return s.len();
}