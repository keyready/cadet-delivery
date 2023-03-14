import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Order } from 'entities/Order';

export const fetchAllOrders = createAsyncThunk<
    Order[],
    void,
    ThunkConfig<string>
>(
    'fetchOrders/fetchAllOrders',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post<Order[]>('/orders');

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
