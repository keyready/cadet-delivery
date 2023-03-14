import { StateSchema } from 'app/providers/StoreProvider';

export const getOrdersIsLoading = (state: StateSchema) => state.Orders?.isLoading;
export const getOrdersError = (state: StateSchema) => state.Orders?.error;
