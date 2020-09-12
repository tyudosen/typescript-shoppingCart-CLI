export interface ShoppingCart {
  item: string;
  price: number;
  salesTax: boolean;
  imported: boolean;
  quantity: number;
}

export interface TaxFunctionObj {
  amount: number;
  tax: number;
}

export interface AddCommandArguments {
  item: string;
  price: number;
  salesTax: boolean;
  imported: boolean;
  quantity: number;
}
