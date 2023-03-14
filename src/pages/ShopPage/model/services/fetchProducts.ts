import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Product } from 'entities/Product';

export const fetchProducts = createAsyncThunk<
    Product[],
    number,
    ThunkConfig<string>
>(
    'shopPage/fetchProducts',
    async (userId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post<Product[]>('/products', { userId });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
