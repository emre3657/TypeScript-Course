// Obligatory types
let myName: string = "Bob";
let numberOfWheels: number = 4;
let isStudent: boolean = false;

// Custom types
type Food = string;
let favoriteFood: Food = "pizza";

type Person = {
  name: string;
  age: number;
  isStudent: boolean;
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
};
