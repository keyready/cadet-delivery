import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { confirmPayment } from '../services/confirmPayment';
import { acceptOrder } from '../services/acceptOrder';
import { createOrder } from '../services/createOrder';
import { completeOrder } from '../services/completeOrder';
import { OrderSchema } from '../types/OrderSchema';

const initialState: OrderSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const OrderSlice = createSlice({
    name: 'OrderSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(createOrder.fulfilled, (
                state,
                action: PayloadAction<any>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(acceptOrder.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(acceptOrder.fulfilled, (
                state,
                action: PayloadAction<any>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(acceptOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(confirmPayment.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(confirmPayment.fulfilled, (
                state,
                action: PayloadAction<any>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(confirmPayment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(completeOrder.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(completeOrder.fulfilled, (
                state,
                action: PayloadAction<any>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(completeOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: OrderActions } = OrderSlice;
export const { reducer: OrderReducer } = OrderSlice;
