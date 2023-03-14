import { StateSchema } from 'app/providers/StoreProvider';

export const getOrderData = (state: StateSchema) => state.Order?.data;
export const getOrderIsLoading = (state: StateSchema) => state.Order?.isLoading;
export const getOrderError = (state: StateSchema) => state.Order?.error;
