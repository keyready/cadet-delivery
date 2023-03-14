import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Order } from 'entities/Order';
import { fetchAllOrders } from '../../model/services/fetchAllOrders';
import { acceptOrder } from '../../../../entities/Order/model/services/acceptOrder';
import { OrdersSchema } from '../types/OrdersSchema';
import { fetchOrdersByUserId } from '../services/fetchOrdersByUserId';

const ordersAdapter = createEntityAdapter<Order>({
    selectId: (order) => order.id || 0,
});

export const getOrders = ordersAdapter.getSelectors<StateSchema>(
    (state) => state.Orders || ordersAdapter.getInitialState(),
);

const ordersSlice = createSlice({
    name: 'ordersSlice',
    initialState: ordersAdapter.getInitialState<OrdersSchema>({
        error: undefined,
        isLoading: false,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrdersByUserId.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
                state.error = undefined;
                state.isLoading = false;
                ordersAdapter.setAll(state, action.payload);
            })
            .addCase(fetchOrdersByUserId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(fetchAllOrders.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.error = undefined;
                state.isLoading = false;
                ordersAdapter.setAll(state, action.payload);
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: ordersReducer } = ordersSlice;
