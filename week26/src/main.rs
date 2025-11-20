fn main() {
    let ans = sum(1, 2);
    println!("{}", ans);

    let even = is_even(3);
    println!("{}", even);

    // string
    let name = String::from("Sada");
    println!("My name is: {}", name);

    // vector
    let vec = vec![1, 2, 3];
    println!("{:?}", vec);

    // condition
    let num = 13;
    let is_even = is_even(num);
    if is_even {
        println!("Thee given number {} is even", num);
    } else {
        println!("Thee given number {} is odd", num);
    }

    // loop
    for i in 0..10 {
        println!("{}", i);
    }

    // ownership
    let name = String::from("Sada");
    let name2 = name;

    println!("{}", name2);
}


// number
fn sum(a: u32, b:u32) -> u32 {
    return a + b;
}

// boolean
fn is_even(a:u32) -> bool {
    return a % 2 == 0;
}