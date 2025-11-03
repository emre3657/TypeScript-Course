import {
  menu,
  orderQueue,
  getNextOrderId,
  getNextPizzaId,
  Order,
} from "./index.js";

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

function displayInfo(person: Person): void {
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

// TS-specific types:
// any
/*
  Do not use 'any'. It goes against TypeScript's type safety philosophy.
  Use cases could be:
  - Temporarily while transitioning a JavaScript codebase to TypeScript
  - As the parameter type in an implementation signature of an overload
*/

// void
/*
  void type is that a function do not have a returning value (e.g. log, delete)
  function will not use return value in the future
*/

// Partial @UtilityTypes
type AnotherUser = {
  id: number;
  username: string;
  role: "member" | "contributor" | "admin";
};
type UpdatedUser = Partial<AnotherUser>;

let nextUserId = 1;

const anotherUsers: AnotherUser[] = [
  { id: nextUserId++, username: "john_doe", role: "member" },
  { id: nextUserId++, username: "jane_smith", role: "contributor" },
  { id: nextUserId++, username: "alice_jones", role: "admin" },
  { id: nextUserId++, username: "charlie_brown", role: "member" },
];

function updateUser(id: number, updates: UpdatedUser): void {
  const user = anotherUsers.find((userObj) => userObj.id === id);
  if (!user) {
    console.log(`No user found with id ${id}`);
    return;
  }
  const { username, role } = updates;
  if (username) Object.assign(user, { username });
  if (role) Object.assign(user, { role });
}

updateUser(1, { username: "new_john_doe" });
updateUser(4, { role: "contributor" });
// console.log(anotherUsers);

// Omit @UtilityTypes
function addNewUser(user: Omit<AnotherUser, "id">): AnotherUser {
  const newUser = {
    id: nextUserId++,
    ...user,
  };
  anotherUsers.push(newUser);
  return newUser;
}

addNewUser({ username: "emre_ekinci", role: "admin" });
console.log(anotherUsers);

// Generics ***
/*
  Add flexibility to existing fucntions, types, etc.
  Act like function parameters, but for types
  Use angle bracket syntax (<>)
*/

const gameScores = [14, 21, 33, 42, 59];
const favoriteThings = [
  "raindrops on roses",
  "whiskers on kitten",
  "bright copper kettles",
  "warm woolen mittens",
];
const voters = [
  { name: "Alice", age: 42 },
  { name: "Bob", age: 77 },
];

function getLastItem<T>(array: T[]): T | undefined {
  return array[array.length - 1];
}

console.log(getLastItem(gameScores));
console.log(getLastItem(favoriteThings));
console.log(getLastItem(voters));

// Generic practice
function addToArray<T>(array: T[], item: T): T[] | undefined {
  if (!array) return;
  array.push(item);
  return array;
}
// usage
addToArray(menu, {
  id: getNextPizzaId(),
  name: "Chicken Bacon Ranch",
  price: 12,
});
addToArray<Order>(orderQueue, {
  id: getNextOrderId(),
  pizza: menu[2],
  status: "completed",
});

// Course finish here

// My notes for some concepts:

// Overload
function printValue(value: string): void;
function printValue(value: number): void;
// One more use case for any type
function printValue(value: any) {
  if (typeof value === "number") console.log(value.toFixed(2));
  else console.log(value.toUpperCase());
}
printValue(42);
printValue("hello");

/* 

| Situation                                                                   | Which One to Use |
| --------------------------------------------------------------------------- | ---------------- |
| The same function works with different types but **shares the same logic**  | ✅ **Generic**  |
| The same function works with different types but **has different behavior** | ✅ **Overload** |

*/

// Enums - Do not use enums, go altenative!
/* 
  Enum is not something that's native to JavaScript. This was actually 
  something that TS Devs introduced pretty early on in typescript and
  wanted to give sort of like a c-sharp object-oriented feeling to typescript.
*/

// Enum is a special structure that it creates 2 things: type and value
/* 
  enum Height = {
    SHORT,
    MIDDLE,
    LONG,
  }

  1) type Height = 0 | 1 | 2 | Height.SHORT | Height.MIDDLE | Height.LONG;  *type exits in compiler time* 
     
  2) const Height = {                                                       *value(object) exits in run time* 
      0: "SHORT",
      1: "MIDDLE",
      2: "LONG",
      SHORT: 0,
      MIDDLE: 1,
      LONG: 2,
    };

    Note*: Unlike types and interfaces, enums live at runtime, which makes them an exception in TypeScript’s type system 
*/

// Enums can be numeric or string:

// 1) Number enums
// The default enum assigns a value(starting from 0) to each member
enum LogLevel {
  DEBUG,
  WARNING,
  ERROR,
}

// type LogLevel = 0 | 1 | 2 | LogLevel.DEBUG | LogLevel.WARNING | LogLevel.ERROR;

/*
  Transpiled enum:
  const LogLevel = {
    0: "DEBUG",
    1: "WARNING",
    2: "ERROR",
    DEBUG: 0,
    WARNING: 1,
    ERROR: 2,
  };
*/

console.log(Object.values(LogLevel)); // ["DEBUG", "WARNING", "ERROR", 0, 1, 2]

// The actual js object is not the same as the traspiled one
/*
  Actual object:
  const LogLevel = {
    DEBUG: 0,
    WARNING: 1,
    ERROR: 2,
  };
*/

// This only occurs with *numeric* enums: Bidirectional mapping - Two-ways mapping
// This is a first annoying thing about enums is that they don't quite behave
// exactly as you expect them to

// usage - numeric enum
function log(logLevel: LogLevel, message: string) {
  console.log(`${logLevel}: ${message}`);
}

log(LogLevel.ERROR, "something went wrong"); // valid
// log("ERROR", "something went wrong"); // invalid - check LogLevel type out at line 256
log(1, "something went wrong"); // valid
// log(12, "something went wrong"); // invalid

// 2) String enums
enum Role {
  GUEST = "guest",
  MEMBER = "member",
  ADMIN = "admin",
}

// type Role = Role.GUEST | Role.MEMBER | Role.ADMIN;
/*
  const Role = {
    GUEST = "guest",
    MEMBER = "member",
    ADMIN = "admin",
  };
*/

console.log(Object.values(Role)); // ["guest", "member", "admin"]

// The actual js object is the same as transpiled one with *string* enums
// Unidirectional mapping - One-way mapping
/*
  const Role = {
    GUEST = "guest",
    MEMBER = "member",
    ADMIN = "admin",
  }
*/

// usage - string enum
function log2(role: Role, message: string) {
  console.log(`${role}: ${message}`);
}

log2(Role.ADMIN, "hello"); // valid
// log2("admin", "hello"); // invalid - check Role type out at line 301
