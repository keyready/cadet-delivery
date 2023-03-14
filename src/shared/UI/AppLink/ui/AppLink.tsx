import { classNames } from 'shared/lib/classNames/classNames';
import { Link, LinkProps } from 'react-router-dom';
import { memo, ReactNode } from 'react';
import classes from './AppLink.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    OUTLINED = 'outlined',
    INVERTED = 'inverted',
    OUTLINED_INVERTED = 'outlined-inverted',
}

interface AppLinkProps extends LinkProps {
    className?: string
    theme?: AppLinkTheme
    children?: ReactNode
}

export const AppLink = memo((props: AppLinkProps) => {
    const {
        to,
        className,
        children,
        theme = AppLinkTheme.PRIMARY,
        ...otherProps
    } = props;

    return (
        <Link
            to={to}
            className={classNames(
                classes.AppLink,
                {},
                [className, classes[theme]],
            )}
            {...otherProps}
        >
            {children}
        </Link>
    );
});
