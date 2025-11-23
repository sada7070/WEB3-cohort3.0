// fn main() {
//     let str = String::from("Sada");

//     let str_len = length(&str);             // borrowing 'str' rather than transfering ownership

//     println!("{}", str_len);
//     println!("{}", str);


//         let mut s1 = String::from("Sada");
//         let s2 = &mut s1;
//         //let s3 = &s1;                       // when one mut variable is borrowed, it cannot be borrowed again for anything(you can borrow immutable variable for anytime we want)

//         println!("{}", s2);
//     }

// fn length(s: &String) -> usize {
//     return s.len();
// }

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// struct Rect {
//     height: u32,
//     width: u32,
// }

// impl Rect {
//     fn area(&self) -> u32 {
//         return self.height * self.width;
//     }

//     fn perimeter(&self) ->u32 {
//         return 2 * (self.height + self.width);
//     }

//     fn printer() {
//         println!("Prints something");
//     }
// }

// fn main() {
//     let r = Rect {
//         width: 6,
//         height:2,
//     };

//     println!("area: {}", r.area());
//     println!("perimeter: {}", r.perimeter());
//     Rect::printer();                        // since 'printer' function does not have 'self', it is not part of 'r'. It is  part of struct Rect. So to call we use this syntax
// }


// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//enums and pattern matching

// enum Direction {
//     North,
//     South,
//     East,
//     West,
// }

// fn main() {
//     let direction = Direction::East;

//     steer(direction);
// }

// fn steer(dir: Direction) {
//     match dir {
//         Direction::North => println!("North direction"),
//         Direction::South => println!("South direction"),
//         _ => println!("Horizontal direction"),                  // default
//     }
// }

// enums with values


enum Shape {
    Square(f32),
    Circle(f32),
    Rectangle(f32, f32)
}

fn main() {
    let shape_square = Shape::Square(4.0);
    let shape_circle = Shape::Circle(5.0);
    let shape_rect = Shape::Rectangle(3.0, 5.0);

    println!("{}", calculate_area(shape_square));
    println!("{}", calculate_area(shape_circle));
    println!("{}", calculate_area(shape_rect));
}

fn calculate_area(s: Shape) -> f32 {
    match s {
        Shape::Square(side) => return side * side,
        Shape::Circle(radius) => return std::f32::consts::PI * radius * radius,
        Shape::Rectangle(l, b) => return l * b,
    }
}
