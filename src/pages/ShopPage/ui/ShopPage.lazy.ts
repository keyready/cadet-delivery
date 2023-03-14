import { lazy } from 'react';

export const ShopPageLazy = lazy(async () => await new Promise((res) => {
    setTimeout(() => {
        // @ts-expect-error
        res(import('./ShopPage'));
    }, 500);
}));
