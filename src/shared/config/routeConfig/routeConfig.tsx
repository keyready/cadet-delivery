import { RouteProps } from 'react-router-dom';
import { NotFound } from 'pages/NotFound';
import { LoginPage } from 'pages/LoginPage';
import { MainPage } from 'pages/MainPage';
import { ShopPage } from 'pages/ShopPage';
import { BasketPage } from 'pages/BasketPage';
import { AdminPage } from 'pages/AdminPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    adminOnly?: boolean;
}

export enum AppRoutes {
    MAIN = 'main',
    LOGIN = 'login',
    SHOP = 'shop',
    BASKET = 'basket',
    ADMIN = 'admin',

    // last
    NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.SHOP]: '/shop',
    [AppRoutes.BASKET]: '/basket',
    [AppRoutes.ADMIN]: '/admin',

    // last
    [AppRoutes.NOT_FOUND]: '*',
};

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage />,
    },
    [AppRoutes.SHOP]: {
        path: RoutePath.shop,
        element: <ShopPage />,
        authOnly: true,
    },
    [AppRoutes.BASKET]: {
        path: RoutePath.basket,
        element: <BasketPage />,
        authOnly: true,
    },
    [AppRoutes.ADMIN]: {
        path: RoutePath.admin,
        element: <AdminPage />,
        authOnly: true,
        adminOnly: true,
    },

    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFound />,
    },
};
