import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

export const completeOrder = createAsyncThunk<
    string,
    number,
    ThunkConfig<string>
>(
    'order/completeOrder',
    async (orderId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post<string>(
                '/complete_order',
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
