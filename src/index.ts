type Pizza = {
  id: number;
  name: string;
  price: number;
};

type Order = {
  id: number;
  pizza: object;
  status: "ordered" | "completed";
};

let nextOrderId = 1;
let nextPizzaId = 1;
let cashInRegister = 100;

const menu: Pizza[] = [
  { id: nextPizzaId++, name: "Margherita", price: 8 },
  { id: nextPizzaId++, name: "Pepperoni", price: 10 },
  { id: nextPizzaId++, name: "Hawaiian", price: 10 },
  { id: nextPizzaId++, name: "Veggie", price: 9 },
];

const orderQueue: Order[] = [];

function addNewPizza(pizza: Omit<Pizza, "id">): Pizza {
  const newPizza: Pizza = {
    id: nextPizzaId++,
    ...pizza,
  };
  menu.push(newPizza);
  return newPizza;
}

function placeOrder(pizzaName: string): Order | undefined {
  const selectedPizza = menu.find((pizzaObj) => pizzaObj.name === pizzaName);

  if (!selectedPizza) {
    console.log("Invalid pizza name");
    return;
  }

  cashInRegister += selectedPizza.price;
  const newOrder: Order = {
    id: nextOrderId++,
    pizza: selectedPizza,
    status: "ordered",
  };
  orderQueue.push(newOrder);

  return newOrder;
}

function completeOrder(orderId: number): Order | undefined {
  const order = orderQueue.find((order) => order.id === orderId);
  if (!order) {
    console.log(`No order with id: ${orderId}`);
    return;
  }
  order.status = "completed";
  return order;
}

function getPizzaDetail(identifier: number | string): Pizza | undefined {
  if (typeof identifier === "number")
    return menu.find((pizzaObj) => pizzaObj.id === identifier);
  else if (typeof identifier === "string")
    return menu.find(
      (pizzaObj) =>
        pizzaObj.name.toLocaleLowerCase() === identifier.toLocaleLowerCase()
    );
  else
    throw new TypeError(
      "Parameter 'identifier' must be either a string or a number"
    );
}

// Add new pizzas
addNewPizza({ name: "Chicken Bacon Ranch", price: 12 });
addNewPizza({ name: "BBQ Chicken", price: 12 });
addNewPizza({ name: "Spicy Sausage", price: 11 });

// Place orders
placeOrder("Chicken Bacon Ranch");
placeOrder("Pepperoni");
completeOrder(1);
placeOrder("Anchovy");
placeOrder("Viggie");
completeOrder(2);

// Get pizza detail
console.log(getPizzaDetail(1));
console.log(getPizzaDetail("Spicy Sausage"));

// console log
console.log("Menu", menu);
console.log("Cash in register", cashInRegister);
console.log("Order queue", orderQueue);
