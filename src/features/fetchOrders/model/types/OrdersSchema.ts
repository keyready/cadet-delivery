import { EntityState } from '@reduxjs/toolkit';
import { Order } from 'entities/Order';

export interface OrdersSchema extends EntityState<Order> {
    isLoading?: boolean;
    error?: string
}
