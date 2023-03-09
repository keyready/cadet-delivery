import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

interface updateUserBasketProps {
    userId?: number
    productsId?: number;
    productsAmount?: number;
}

export const updateUserBasket = createAsyncThunk<
    string,
    updateUserBasketProps,
    ThunkConfig<string>
>(
    'basket/updateUserBasket',
    async (
        { userId, productsId, productsAmount },
        thunkAPI,
    ) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<string>('/basket', {
                userId,
                productsId,
                productsAmount,
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('login error');
        }
    },
);
