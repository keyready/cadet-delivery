import { lazy } from 'react';

export const OrdersPageLazy = lazy(async () => await new Promise((res) => {
    setTimeout(() => {
        // @ts-expect-error
        res(import('./OrdersPage'));
    }, 500);
}));
