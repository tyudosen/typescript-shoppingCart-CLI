import { readFileSync, writeFileSync } from "fs";
import { ShoppingCart, TaxFunctionObj } from "../interfaces/interfaces";

const numeral = require("numeral");
const chalk = require("chalk");

/**
 * name: LoadCart
 * params (void)
 * description: Loads shopping cart data from cart.json
 */
const LoadCart = () => {
  try {
    const DataBuffer = readFileSync("cart.json");
    const DataJSON = DataBuffer.toString();
    return JSON.parse(DataJSON);
  } catch (err) {
    return [];
  }
};

/**
 * name: SaveCart
 * params (array: shoppingCart Obj)
 * description: Saves shopping cart data to cart.json
 */
const SaveCart = (arr: ShoppingCart[]) => {
  const DataJSON = JSON.stringify(arr);
  writeFileSync("cart.json", DataJSON);
};

/**
 * name: addItem
 * params (item,price,salesTax,imported,quantity)
 * description: Add item to cart array and saves data to cart.json
 */
const addItem = (
  item: string,
  price: number,
  salesTax: boolean,
  imported: boolean,
  quantity: number
): void => {
  const cart: ShoppingCart[] = LoadCart();
  cart.push({
    item,
    price,
    salesTax,
    imported,
    quantity,
  });
  SaveCart(cart);
  console.log(chalk.blue.inverse("Item Added"));
};

/**
 * name: genMessage
 * params (item: shoppingCart Obj, amount: number)
 * description: Generates message for receipt
 */
const genMessage = (
  { imported, item, quantity, price }: ShoppingCart,
  amount: number
) => {
  let message: string = `${imported ? "Imported" : ""} ${item}: ${numeral(
    amount
  ).format("$0.00")}`;
  if (quantity > 1) {
    message += ` (${quantity} @ ${numeral(price).format("$0.00")})`;
  }
  console.log(chalk.yellow(message));
};

/**
 * name: calcTaxAndAmount
 * params (item: shoppingCart Obj)
 * description: Determines which tax rate to use and calculates item price
 */
const calcTaxAndAmount = ({
  price,
  quantity,
  salesTax,
  imported,
}: ShoppingCart): TaxFunctionObj => {
  let taxRate = 0;
  let amount: number;

  if (salesTax && imported) {
    taxRate = 0.15;
  } else if (salesTax && !imported) {
    taxRate = 0.1;
  } else if (!salesTax && imported) {
    taxRate = 0.05;
  } else if (!salesTax && !imported) {
    taxRate = 0;
  }

  let tax = taxRate * price;
  tax = Math.ceil(tax * 20) / 20;
  amount = (price + tax) * quantity;

  return {
    amount,
    tax,
  };
};

/**
 * name: calculateTotal
 * params (void)
 * description: Calculates shopping cart total and the total tax. Clears cart.json for next purchase
 */
const calculateTotal = () => {
  const cart = LoadCart();
  let tax = 0;
  let total = 0;
  cart.map((item: ShoppingCart) => {
    const { amount, tax: itemTax } = calcTaxAndAmount(item);
    genMessage(item, amount);
    tax += itemTax;
    total += amount;
  });
  console.log(
    chalk.red.inverse(`Sales Taxes: ${numeral(tax).format("$0.00")}`)
  );
  console.log(chalk.red.inverse(`Total: ${numeral(total).format("$0.00")}`));

  //clear cart.json after calculation
  SaveCart([]);
};

export { addItem, calculateTotal };
