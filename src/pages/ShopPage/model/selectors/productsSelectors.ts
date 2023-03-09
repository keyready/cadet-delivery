import { StateSchema } from 'app/providers/StoreProvider';

export const getProductsIsLoading = (state: StateSchema) => state.products?.isLoading;
export const getProductsError = (state: StateSchema) => state.products?.error;
