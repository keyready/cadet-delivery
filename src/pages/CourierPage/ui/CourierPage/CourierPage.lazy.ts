import { lazy } from 'react';

export const CourierPageLazy = lazy(async () => await new Promise((res) => {
    setTimeout(() => {
        // @ts-expect-error
        res(import('./CourierPage'));
    }, 500);
}));
