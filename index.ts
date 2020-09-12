import * as yargs from "yargs";
import { addItem, calculateTotal } from "./src/utils/utils";
import { AddCommandArguments } from "./src/interfaces/interfaces";

//Add command
yargs.command({
  command: "add",
  describe: "Add item to list",
  builder: {
    item: {
      describe: "Description of item",
      demandOption: true,
      type: "string",
    },
    price: {
      describe: "Price of Item",
      demandOption: true,
      type: "number",
    },
    tax: {
      describe:
        "If you are purchasing food, books or medical products enter false. If you are not enter true.",
      demandOption: true,
      type: "boolean",
    },
    imported: {
      describe: "Is this item imported ? If yes enter true if not enter false",
      demandOption: true,
      type: "boolean",
    },
    quantity: {
      describe: "How many are you buying ?",
      demandOption: true,
      type: "number",
    },
  },
  handler(argv: AddCommandArguments) {
    addItem(argv.item, argv.price, argv.salesTax, argv.imported, argv.quantity);
  },
});

//checkout command
yargs.command({
  command: "checkout",
  describe: "Complete purchase",
  builder: {},
  handler() {
    calculateTotal();
  },
});

yargs.parse();
