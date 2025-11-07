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
type User2 = {
  id: number;
  username: string;
  role: "member" | "contributor" | "admin";
};
type UpdatedUser = Partial<User2>;

let nextUserId = 1;

const users2: User2[] = [
  { id: nextUserId++, username: "john_doe", role: "member" },
  { id: nextUserId++, username: "jane_smith", role: "contributor" },
  { id: nextUserId++, username: "alice_jones", role: "admin" },
  { id: nextUserId++, username: "charlie_brown", role: "member" },
];

function updateUser(id: number, updates: UpdatedUser): void {
  const user = users2.find((userObj) => userObj.id === id);
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
// console.log(users2);

// Omit @UtilityTypes
function addNewUser(user: Omit<User2, "id">): User2 {
  const newUser = {
    id: nextUserId++,
    ...user,
  };
  users2.push(newUser);
  return newUser;
}

addNewUser({ username: "emre_ekinci", role: "admin" });
console.log(users2);

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

/**************************** Course finish here ****************************/

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
// TS only care about run time values with type checking, but string enum(s) don't comply it
// can only use Enum.member
function log2(role: Role, message: string) {
  console.log(`${role}: ${message}`);
}

log2(Role.ADMIN, "hello"); // valid
// log2("admin", "hello"); // invalid - check Role type out at line 301

/********************************************************************************/

// typeof (TypeScript type operator) - used ChatGPT
/*
What it is:
In type positions, typeof creates a type from a value.
(In runtime code, typeof is the JavaScript operator returning strings like "string", but that’s different.)
*/

// Primary use-cases
// - Generate types from objects (“source-of-truth” object → type)
// - Take a function’s return type (via ReturnType<typeof fn>)
// - Derive types from constants / config maps

// a) Object → Type (auto-sync shape)
const user = { name: "Alice", age: 30 } as const;

type User3 = typeof user;
// { readonly name: "Alice"; readonly age: 30 }
// Note: as const keeps literal types. Without it you’d get { name: string; age: number }.

// b) Function return type (with ReturnType)
function makeUser(id: number) {
  return { id, active: true };
}

type MakeUserReturn = ReturnType<typeof makeUser>;
// { id: number; active: boolean }

// c) Reusing a function type signature
function fetchById(id: string): Promise<number> {
  return Promise.resolve(Number(id));
}

type FetchById = typeof fetchById;
// (id: string) => Promise<number>

// keyof - used ChatGPT
/*
What it is:
keyof T produces a union of property names of T as string/number/symbol literals.
*/

// Primary use-cases
// - Key-safe generic utilities (prevent misspelled property names)
// - Restrict valid keys for API/selector helpers
// - Build mapped types from an existing shape

// a) Key-safe getter
type User4 = { id: string; name: string; age: number };

type UserKey = keyof User4; // "id" | "name" | "age"

function getValue<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const u: User4 = { id: "1", name: "Alice", age: 30 };
getValue(u, "name"); // ok
// getValue(u, "email"); // ❌ error: "email" is not a key of User

// b) Prevent wrong property usage
function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const out = {} as Pick<T, K>;
  for (const k of keys) out[k] = obj[k];
  return out;
}

pick(u, "id", "age"); // ok
// pick(u, "role");        // ❌ error

// keyof + typeof (together - very common)
// Pattern: Take an object value → turn it into a type with typeof → extract its keys with keyof.

// a) Safely index a config map
const roles = {
  admin: 1,
  user: 2,
  guest: 3,
} as const;

type RoleKey = keyof typeof roles; // "admin" | "user" | "guest"

function getRoleValue(key: RoleKey) {
  return roles[key];
}

getRoleValue("admin"); // ok
// getRoleValue("super"); // ❌ error

// b) Enforce valid keys across modules
/*
// colors.ts
export const colors = {
  primary: "#0ea5e9",
  success: "#22c55e",
  danger: "#ef4444",
} as const;

// types.ts
import { colors } from "./colors";
export type ColorName = keyof typeof colors;  // "primary" | "success" | "danger"

// usage.ts
import { colors } from "./colors";
import type { ColorName } from "./types";

function getHex(name: ColorName) {
  return colors[name];
}
*/

// c) Exhaustive switch by keys
const featureFlags = {
  newUI: true,
  betaSearch: false,
} as const;

type FlagName = keyof typeof featureFlags;

function enableFlag(flag: FlagName) {
  switch (flag) {
    case "newUI":
    case "betaSearch":
      // handle…
      break;
    default:
      // never happens if FlagName is exhaustive
      const _exhaustiveCheck: never = flag;
      return _exhaustiveCheck;
  }
}

// “All the common ways” you’ll use them

// a) With objects (catalog/config → type)
const endpoints = {
  users: "/api/users",
  posts: "/api/posts",
} as const;

type Endpoints = typeof endpoints; // { readonly users: "/api/users"; ... }
type EndpointName = keyof typeof endpoints; // "users" | "posts"

function call(name: EndpointName) {
  return fetch(endpoints[name]);
}

// b) With enums or enum-like objects
const Status = {
  Pending: "PENDING",
  Done: "DONE",
  Canceled: "CANCELED",
} as const;

type StatusCode = (typeof Status)[keyof typeof Status];
// "PENDING" | "DONE" | "CANCELED"

// c) Building mapped types from keys
type Fields = { title: string; views: number; published: boolean };

type ReadonlyFields = {
  readonly [K in keyof Fields]: Fields[K];
};
// { readonly title: string; readonly views: number; readonly published: boolean }

// c) Key-filtered helpers
function hasKey<T extends object>(obj: T, key: PropertyKey): key is keyof T {
  return key in obj;
}

// d) Mirror a function’s signature/type
function parse(input: string): { ok: boolean; value?: number } {
  const n = Number(input);
  return Number.isNaN(n) ? { ok: false } : { ok: true, value: n };
}

type Parse = typeof parse; // (input: string) => { ok: boolean; value?: number }
type ParseResult = ReturnType<typeof parse>; // { ok: boolean; value?: number }

// Extra - My question: Why do we need ReturnType if typeof exists?

// typeof someFunction gives you the function’s type (its parameter list and return type), not the return type alone.

// To extract only the return type, you need a conditional type helper — that’s exactly what ReturnType does:
function make(): Promise<string> {
  return Promise.resolve("ok");
}

type Fn = typeof make;
// type Fn = () => Promise<string>

type Out = ReturnType<typeof make>;
// type Out = Promise<string>

// In short: typeof = “give me the type of this value”.
// ReturnType = “from that function type, give me just its return type”.

// as const
// Make js object immutable(constant).
// Alternative to enums
// TS specific syntax
const routes = {
  home: "/",
  admin: "/admin",
  users: "/users",
} as const;

const goToRoute = (route: "/" | "/admin" | "/users") => {};

// with 'as const', 2 lines are valid in the below.
goToRoute("/"); // valid
goToRoute(routes.home); // valid, we'll take error if remove as const. Because routes.home infered as a string.

// extract routes with dynamic property access
type Route = (typeof routes)[keyof typeof routes]; // "/" | "/admin" | "/users"

// Now Route can be used in multiple place, it provides to not repeat at giving tpye
const goToRoute2 = (route: Route) => {};
goToRoute2("/");
goToRoute2("/admin");

// Start reading the TypeScript documentation at typescriptlang.org

// Interfaces
// An interface declaration is another way to name an object type:
interface FullName {
  name: string;
  surname: string;
}

const fullName: FullName = { name: "Emre", surname: "Ekinci" };

// type aliases and interfaces are very similar, the key distinction is type aliases cannot be re-opened and add new properties vs interfaces are always extendable and redeclared.
// extends
interface Username extends FullName {
  username: "GoalKeeper";
}

// type aliases can just be extendable with (&) intersection, but cannot reopened and redefined. So type name must be different.
type Animal = {
  name: string;
};
// &
type Bear = Animal & {
  honey: boolean;
};

// Existing interface
// OK
interface FullName {
  secondName?: string;
}

const fullName2: FullName = {
  name: "Emre",
  secondName: "Reis",
  surname: "Ekinci",
};

// Existing type alias
// Not allowed - Duplicate identifier 'Animal' at line 574
type Animal = {
  isMammal: boolean;
};
