import { EntityState } from '@reduxjs/toolkit';
import { Product } from 'entities/Product';

export interface ProductsSchema extends EntityState<Product> {
    isLoading?: boolean;
    error?: string
}
