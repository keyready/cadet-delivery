import { StateSchema } from 'app/providers/StoreProvider';

export const getProductsIsLoading = (state: StateSchema) => state.Products?.isLoading;
export const getProductsError = (state: StateSchema) => state.Products?.error;
