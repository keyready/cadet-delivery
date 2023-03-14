import { classNames } from 'shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import classes from './Button.module.scss';

export enum ButtonTheme {
    DEFAULT = 'default',
    PRIMARY = 'primary',
    INVERTED = 'inverted',
    CLEAR = 'clear',
    OUTLINED = 'outlined',
    ERROR = 'error',
    SUCCESS = 'success'
}

export enum ButtonSize {
    m = 'size_m',
    l = 'size_l',
    xl = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    theme?: ButtonTheme
    size?: ButtonSize
    disabled?: boolean
    children?: ReactNode
}

export const Button = memo((props: ButtonProps) => {
    const {
        onClick,
        className,
        theme = ButtonTheme.DEFAULT,
        children,
        disabled,
        size = ButtonSize.m,
        ...otherProps
    } = props;

    return (
        <button
            type="button"
            className={classNames(
                classes.Button,
                { [classes.disabled]: disabled },
                [className, classes[theme], classes[size]],
            )}
            onClick={onClick}
            {...otherProps}
            disabled={disabled}
        >
            {children}
        </button>
    );
});
