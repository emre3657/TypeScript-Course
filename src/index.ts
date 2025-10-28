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

const menu: Pizza[] = [
  { id: 1, name: "Margherita", price: 8 },
  { id: 2, name: "Pepperoni", price: 10 },
  { id: 3, name: "Hawaiian", price: 10 },
  { id: 4, name: "Veggie", price: 9 },
];

let nextOrderId = 1;
let cashInRegister = 100;
const orderQueue: Order[] = [];

function addNewPizza(pizzaObj: Pizza) {
  menu.push(pizzaObj);
  return;
}

function placeOrder(pizzaName: string) {
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

function completeOrder(orderId: number) {
  const order = orderQueue.find((order) => order.id === orderId);
  if (!order) {
    console.log(`No order with id: ${orderId}`);
    return;
  }
  order.status = "completed";
  return order;
}

// Add new pizzas
addNewPizza({ id: 5, name: "Chicken Bacon Ranch", price: 12 });
addNewPizza({ id: 6, name: "BBQ Chicken", price: 12 });
addNewPizza({ id: 7, name: "Spicy Sausage", price: 11 });

// Place orders
placeOrder("Chicken Bacon Ranch");
placeOrder("Pepperoni");
completeOrder(1);
placeOrder("Anchovy");
placeOrder("Viggie");
completeOrder(2);

// console log
console.log("Menu", menu);
console.log("Cash in register", cashInRegister);
console.log("Order queue", orderQueue);
