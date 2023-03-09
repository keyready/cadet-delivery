import { lazy } from 'react';

export const BasketPageLazy = lazy(async () => await new Promise((res) => {
    setTimeout(() => {
        // @ts-expect-error
        res(import('./BasketPage'));
    }, 500);
}));
