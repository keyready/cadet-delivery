import { lazy } from 'react';

export const MainPageLazy = lazy(async () => await new Promise((res) => {
    setTimeout(() => {
        // @ts-expect-error
        res(import('./MainPage'));
    }, 500);
}));
