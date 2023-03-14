import { Product } from 'entities/Product';

export interface Basket {
    id?: number;
    products?: Product[];
}
