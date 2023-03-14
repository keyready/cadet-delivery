import { Basket } from './Basket';

export interface BasketSchema {
    data?: Basket;
    isLoading?: boolean;
    error?: string;
}
