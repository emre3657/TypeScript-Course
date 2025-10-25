const menu = [
  { name: "Margherita", price: 8 },
  { name: "Pepperoni", price: 10 },
  { name: "Hawaiian", price: 10 },
  { name: "Veggie", price: 9 },
];

let nextOrderId = 0;
let cashInRegister = 100;
const orderQueue = [];

function addNewPizza(pizzaObj) {
  menu.push(pizzaObj);
  return;
}

function placeOrder(pizzaName) {
  const selectedPizza = menu.find((pizzaObj) => pizzaObj.name === pizzaName);

  if (!selectedPizza) {
    console.log("Invalid pizza name");
    return;
  }

  cashInRegister += selectedPizza.price;
  const newOrder = {
    id: nextOrderId++,
    pizza: selectedPizza,
    status: "ordered",
  };
  orderQueue.push(newOrder);

  return newOrder;
}

function completeOrder(orderId) {
  const order = orderQueue.find((order) => order.id === orderId);
  if (!order) {
    console.log(`No order with id: ${orderId}`);
    return;
  }
  order.status = "completed";
  return order;
}
