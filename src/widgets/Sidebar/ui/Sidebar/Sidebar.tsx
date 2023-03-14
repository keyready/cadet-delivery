import { memo, useMemo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'shared/UI/ThemeSwitcher';
import { Button } from 'shared/UI/Button';
import { ButtonTheme } from 'shared/UI/Button/ui/Button';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData, userActions } from 'entities/User';
import { useNavigate } from 'react-router-dom';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import classes from './Sidebar.module.scss';

export interface SidebarProps {
    classname?: string
}

export const Sidebar = memo(({ classname }: SidebarProps) => {
    const SidebarItemsList = useSelector(getSidebarItems);
    const [collapsed, setCollapsed] = useState<boolean>(true);

    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const listItem = useMemo(
        () => SidebarItemsList.map((item) => (
            <SidebarItem
                key={item.path}
                collapsed={collapsed}
                item={item}
            />
        )),
        [SidebarItemsList, collapsed],
    );

    return (
        <div
            data-testid="sidebar"
            className={classNames(
                classes.Sidebar,
                { [classes.collapsed]: collapsed },
                [classname],
            )}
        >
            <div className={classes.items}>
                {listItem}
            </div>

            <div className={classes.switchers}>
                {authData
                    ? (
                        <Button
                            onClick={() => dispatch(userActions.logout())}
                        >
                            Выйти
                        </Button>
                    )
                    : (
                        <Button
                            onClick={() => navigate('/login')}
                        >
                            Войти
                        </Button>
                    )}

                <Button
                    data-testid="sidebar-button"
                    theme={ButtonTheme.PRIMARY}
                    onClick={toggleSidebar}
                >
                    <h3>{collapsed ? '➥' : '⇐'}</h3>
                </Button>
            </div>
        </div>
    );
});
