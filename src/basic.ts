// Obligatory types
let myName: string = "Bob";
let numberOfWheels: number = 4;
let isStudent: boolean = false;

// Custom and Nested types
type Food = string;
let favoriteFood: Food = "pizza";

type Person = {
  name: string;
  age: number;
  isStudent: boolean;
  address?: Address;
};

type Address = {
  street: string;
  city: string;
  country: string;
};

const person1: Person = {
  name: "Salih",
  age: 55,
  isStudent: false,
};

const person2: Person = {
  name: "Emre",
  age: 20,
  isStudent: true,
  address: {
    street: "Yazgülü",
    city: "İstanbul",
    country: "Türkiye",
  },
};

function displayInfo(person: Person) {
  console.log(`${person.name} lives at ${person.address?.street}`);
}

displayInfo(person1);

// Typing arrays
let ages: number[] = [100, 101];
let people: Person[] = [person1, person2];

// Literal types
// Typscript infers type automaticly. Type of const variable equals to its value, type of let variable can be built-in(string, number vs.) or its value as const's type is.
let myName1 = "emre";
const myName2 = "emre";

// Unions
type UserRole = "guest" | "member" | "admin";

type User = {
  username: string;
  role: UserRole;
};

let userRole: UserRole = "member";

// Function return types
const users: User[] = [
  { username: "emre", role: "admin" },
  { username: "ali", role: "member" },
  { username: "onur", role: "guest" },
];

function fetchUserDetails(username: string): User {
  const user = users.find((userObj) => userObj.username === username);
  if (!user) {
    throw new Error(`User not found with username ${username}`);
  }
  return user;
}
