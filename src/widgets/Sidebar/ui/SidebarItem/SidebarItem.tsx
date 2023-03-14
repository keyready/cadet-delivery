import { AppLink, AppLinkTheme } from 'shared/UI/AppLink/ui/AppLink';
import { useLocation } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { SidebarItemType } from 'widgets/Sidebar/model/types/sidebar';
import { getBasketData } from 'entities/Basket/model/selectors/Basket';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchBasketByUserId } from 'entities/Basket/model/services/fetchBasketByUserId';
import classes from './SidebarItem.module.scss';

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed?: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
    const location = useLocation();
    const authData = useSelector(getUserAuthData);

    if (item.authOnly && !authData) {
        return null;
    }

    return (
        <AppLink
            to={item?.path || ''}
            className={classNames(classes.item, { [classes.collapsed]: collapsed }, [])}
            theme={location.pathname === item?.path
                ? AppLinkTheme.OUTLINED_INVERTED
                : AppLinkTheme.INVERTED}
        >
            <item.Icon className={classes.icon} />
            <span className={classes.link}>
                {item?.text}
            </span>
        </AppLink>
    );
});
