import { lazy } from 'react';

export const AdminPageLazy = lazy(async () => await new Promise((res) => {
    setTimeout(() => {
        // @ts-expect-error
        res(import('./AdminPage'));
    }, 500);
}));
