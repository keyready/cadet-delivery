import React, {
    InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import classes from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    autoFocus?: boolean;
    readonly?: boolean;
    onChange?: (value: string) => void
}

export const Input = memo((props: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0);
    const ref = useRef<HTMLInputElement>(null);
    const {
        className,
        value,
        onChange,
        placeholder,
        type = 'text',
        autoFocus,
        readonly,
        ...otherProps
    } = props;

    useEffect(() => {
        if (autoFocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autoFocus]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        setCaretPosition(e.target.value.length);
    };
    const onFocus = () => setIsFocused(true);
    const onBlur = () => setIsFocused(false);
    const onSelect = (e: any) => setCaretPosition(e?.target?.selectionStart || 0);

    const mods: Mods = {
        [classes.readonly]: readonly,
    };

    return (
        <div className={classNames(classes.InputWrapper, mods, [className])}>
            {placeholder && (
                <div className={classes.placeholder}>
                    {`${placeholder}>`}
                </div>
            )}
            <div className={classes.caretWrapper}>
                <input
                    ref={ref}
                    value={value || ''}
                    onChange={onChangeHandler}
                    className={classes.Input}
                    type={type}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSelect={onSelect}
                    readOnly={readonly}
                    {...otherProps}
                />
                {isFocused && !readonly
                    && (
                        <span
                            className={classes.caret}
                            style={{ left: `${caretPosition * 8.8}px` }}
                        />
                    )}
            </div>

        </div>
    );
});
