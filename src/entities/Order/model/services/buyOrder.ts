import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

export const buyOrder = createAsyncThunk<
    string,
    number,
    ThunkConfig<string>
>(
    'order/buyOrder',
    async (orderId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post<string>(
                '/buy_order',
                { orderId },
            );

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
