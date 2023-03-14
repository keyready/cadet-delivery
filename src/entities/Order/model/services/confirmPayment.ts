import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Order } from 'entities/Order';

interface acceptOrderProps {
    orderId?: number;
}

export const confirmPayment = createAsyncThunk<
    string,
    acceptOrderProps,
    ThunkConfig<string>
>(
    'order/confirmPayment',
    async (props, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post<string>(
                '/confirm_payment',
                { orderId: props.orderId },
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
