import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, {
    MutableRefObject,
    ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { Portal } from 'shared/UI/Portal/Portal';
import { useTheme } from 'app/providers/ThemeProvider';
import classes from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    lazy?: boolean;
    onClose?: () => void;
}

export const Modal = (props: ModalProps) => {
    const { theme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    const {
        className,
        children,
        isOpen,
        onClose,
        lazy,
    } = props;

    const [isClosing, setIsClosing] = useState(false);
    const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    const mods: Mods = {
        [classes.opened]: isOpen,
        [classes.isClosing]: isClosing,
    };

    const onCloseHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timeRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, 250);
        }
    }, [onClose]);

    const keyDownHandler = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onCloseHandler();
        }
    }, [onCloseHandler]);

    useEffect(() => {
        if (isOpen) setIsMounted(true);
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', keyDownHandler);
        }

        return () => {
            clearTimeout(timeRef.current);
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [isOpen, keyDownHandler]);

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    if (lazy && !isMounted) return null;

    return (
        <Portal element={document.body}>
            <div
                data-testid="modal"
                className={classNames(classes.Modal, mods, [className, theme])}
            >
                <div className={classes.overlay} onClick={onCloseHandler}>
                    <div
                        className={classes.content}
                        onClick={onContentClick}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
