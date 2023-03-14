import { StateSchema } from 'app/providers/StoreProvider';

export const getBasketData = (state: StateSchema) => state.Basket?.data;
export const getBasketIsLoading = (state: StateSchema) => state.Basket?.isLoading;
export const getBasketError = (state: StateSchema) => state.Basket?.error;
