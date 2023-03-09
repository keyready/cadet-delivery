import { StateSchema } from 'app/providers/StoreProvider';

export const getBasketData = (state: StateSchema) => state.basket?.data;
export const getBasketIsLoading = (state: StateSchema) => state.basket?.isLoading;
export const getBasketError = (state: StateSchema) => state.basket?.error;
