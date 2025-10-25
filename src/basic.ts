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
