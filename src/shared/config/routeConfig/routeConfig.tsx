import { RouteProps } from 'react-router-dom';
import { NotFound } from 'pages/NotFound';
import { LoginPage } from 'pages/LoginPage';
import { MainPage } from 'pages/MainPage';
import { ShopPage } from 'pages/ShopPage';
import { BasketPage } from 'pages/BasketPage';
import { AdminPage } from 'pages/AdminPage';
import { OrdersPage } from 'pages/OrdersPage';
import { CourierPage } from 'pages/CourierPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    adminOnly?: boolean;
    courierOnly?: boolean;
}

export enum AppRoutes {
    MAIN = 'main',
    LOGIN = 'login',
    SHOP = 'shop',
    BASKET = 'basket',
    ORDERS = 'orders',
    ADMIN = 'admin',
    COURIER = 'courier',

    // last
    NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.SHOP]: '/shop',
    [AppRoutes.BASKET]: '/basket',
    [AppRoutes.ORDERS]: '/orders',
    [AppRoutes.ADMIN]: '/admin',
    [AppRoutes.COURIER]: '/courier_page',

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
    [AppRoutes.ORDERS]: {
        path: RoutePath.orders,
        element: <OrdersPage />,
        authOnly: true,
    },
    [AppRoutes.COURIER]: {
        path: RoutePath.courier,
        element: <CourierPage />,
        authOnly: true,
        courierOnly: true,
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
