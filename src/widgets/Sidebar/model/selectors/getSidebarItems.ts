import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assests/icons/home.svg';
import CartIcon from 'shared/assests/icons/cart.svg';
import ShopIcon from 'shared/assests/icons/shop.svg';
import AdminIcon from 'shared/assests/icons/admin.svg';
import OrdersIcon from 'shared/assests/icons/orders.svg';
import CourierIcon from 'shared/assests/icons/courier.svg';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const SidebarItemsList: SidebarItemType[] = [
            {
                path: RoutePath.main,
                text: 'Главная',
                Icon: MainIcon,
            },
        ];
        if (userData) {
            SidebarItemsList.push(
                {
                    path: RoutePath.shop,
                    text: 'Магазин',
                    Icon: ShopIcon,
                },
                {
                    path: RoutePath.basket,
                    text: 'Корзина',
                    Icon: CartIcon,
                },
                {
                    path: RoutePath.orders,
                    text: 'Заказы',
                    Icon: OrdersIcon,
                },
            );
        }

        if (userData?.role === 'courier') {
            SidebarItemsList.push(
                {
                    path: RoutePath.courier,
                    text: 'Курьер',
                    Icon: CourierIcon,
                },
            );
        }

        if (userData?.role === 'admin') {
            SidebarItemsList.push(
                {
                    path: RoutePath.admin,
                    text: 'Админка',
                    Icon: AdminIcon,
                },
            );
        }

        return SidebarItemsList;
    },
);
