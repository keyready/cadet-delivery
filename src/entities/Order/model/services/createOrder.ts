import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

interface createOrderProps {
    basketId?: number;
    userId?: number
}

export const createOrder = createAsyncThunk<
    string,
    createOrderProps,
    ThunkConfig<string>
>(
    'order/createOrder',
    async (newOrder, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        console.log('slice', newOrder);

        try {
            const response = await extra.api.post<string>(
                '/createOrder',
                newOrder,
            );

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('login error');
        }
    },
);
