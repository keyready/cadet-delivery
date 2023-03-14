import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { BasketActions } from 'entities/Basket';
import { Basket } from '../types/Basket';

export const fetchBasketByUserId = createAsyncThunk<
    Basket,
    number,
    ThunkConfig<string>
>(
    'basket/fetchBasketByUserId',
    async (userId, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<Basket>(`/basket/${userId}`);

            if (!response.data) {
                throw new Error();
            }

            dispatch(BasketActions.setBasket(response.data));

            return response.data;
        } catch (e) {
            return rejectWithValue('basket is empty');
        }
    },
);
