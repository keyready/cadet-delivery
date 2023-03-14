import { Product } from 'entities/Product';

export interface Order {
    id?: number;
    courierId?: number;
    products: Product[];
    status?: string;
    paid?: boolean;
    courierPaymentLink?: string;
}
