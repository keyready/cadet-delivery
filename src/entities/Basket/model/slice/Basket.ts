import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Basket } from 'entities/Basket/model/types/Basket';
import { fetchBasketByUserId } from '../services/fetchBasketByUserId';
import { BasketSchema } from '../types/BasketSchema';

const initialState: BasketSchema = {
    data: undefined,
    error: undefined,
    isLoading: false,
};

export const BasketSlice = createSlice({
    name: 'BasketSlice',
    initialState,
    reducers: {
        setBasket: (
            state,
            action: PayloadAction<Basket>,
        ) => {
            state.data = action.payload;
        },
    },
    extraReducers: ((builder) => {
        builder
            .addCase(fetchBasketByUserId.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchBasketByUserId.fulfilled, (
                state,
                action: PayloadAction<any>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchBasketByUserId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }),
});

export const { actions: BasketActions } = BasketSlice;
export const { reducer: BasketReducer } = BasketSlice;
