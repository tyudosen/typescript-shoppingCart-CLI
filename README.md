# Toyoabasi Udosen (Question 2)

I went with a simple CLI implementation of a solution. I used the libary `yargs` to control taking user input and running my functions.
the shopping cart is saved in the form of JSON making it easy to parse and perform the necessary calculations.

# How to run

- Run command `npm install` to install all dependencies stated in package.json.
- Run `ts-node index.ts --help` to see a list of commands you can use.
- `ts-node index.ts [command]`

---

# Commands

- `add` Adds an item to cart.json
- `checkout` Complete purchase, logs the receipt to the terminal and clears cart.json

# Usage

- ts-node index.ts add --item="Book" --price="12.49" --tax=false --imported=false --quantity=2
- ts-node index.ts checkout
