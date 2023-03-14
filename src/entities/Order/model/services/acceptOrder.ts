import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Order } from 'entities/Order';

interface acceptOrderProps {
    courierId?: number;
    orderId?: number;
}

export const acceptOrder = createAsyncThunk<
    string,
    acceptOrderProps,
    ThunkConfig<string>
>(
    'order/acceptOrder',
    async (props, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post<string>(
                '/accept_order',
                { orderId: props.orderId, courierId: props.courierId },
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
