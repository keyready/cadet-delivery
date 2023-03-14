import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Order } from 'entities/Order';

export const fetchOrdersByUserId = createAsyncThunk<
    Order[],
    number,
    ThunkConfig<string>
>(
    'orders/fetchOrdersByUserId',
    async (userId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post<Order[]>('/orders', { userId });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
