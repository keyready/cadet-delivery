import { Order } from './Order';

export interface OrderSchema {
    data?: Order;
    isLoading: boolean;
    error?: string;
}
