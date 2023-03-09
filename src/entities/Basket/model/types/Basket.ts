import { Product } from 'entities/Product';

interface AmountsArray {
    productsId: number[];
    productsAmount: number[];
}

export interface Basket {
    products?: Product[];
    amount: number[];
    amountsArray: AmountsArray;
}
