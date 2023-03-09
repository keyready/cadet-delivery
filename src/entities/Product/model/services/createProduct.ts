import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Product } from '../types/Product';

export const createProduct = createAsyncThunk<
    string,
    Product,
    ThunkConfig<string>
>(
    'product/createProduct',
    async (newProduct, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<string>('/createProduct', { newProduct });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('login error');
        }
    },
);
