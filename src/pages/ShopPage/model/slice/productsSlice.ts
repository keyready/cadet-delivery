import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Product } from 'entities/Product';
import { StateSchema } from 'app/providers/StoreProvider';
import { ProductsSchema } from '../types/ProductsSchema';
import { fetchProducts } from '../services/fetchProducts';

const productsAdapter = createEntityAdapter<Product>({
    selectId: (product) => {
        console.log(product);
        return product.id || 0;
    },
});

export const getProducts = productsAdapter.getSelectors<StateSchema>(
    (state) => state.Products || productsAdapter.getInitialState(),
);

const productsSlice = createSlice({
    name: 'productsSlice',
    initialState: productsAdapter.getInitialState<ProductsSchema>({
        error: undefined,
        isLoading: false,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                productsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: productsReducer } = productsSlice;
