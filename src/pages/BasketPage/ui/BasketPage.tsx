import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import {
    memo, useCallback, useEffect, useState,
} from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { fetchBasketByUserId } from 'entities/Basket/model/services/fetchBasketByUserId';
import { getBasketData, getBasketError } from 'entities/Basket/model/selectors/Basket';
import {
    DynamicModuleLoader, ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { BasketReducer } from 'entities/Basket';
import { BasketCard } from 'entities/Basket/ui/BasketCard';
import { Alert, Button } from 'react-bootstrap';
import { AppLink } from 'shared/UI/AppLink';
import { AppLinkTheme } from 'shared/UI/AppLink/ui/AppLink';
import { createOrder } from 'entities/Order';
import classes from './BasketPage.module.scss';

interface BasketPageProps {
    className?: string;
}

const reducers: ReducersList = {
    Basket: BasketReducer,
};

const BasketPage = memo((props: BasketPageProps) => {
    const {
        className,
    } = props;

    const dispatch = useAppDispatch();
    const basket = useSelector(getBasketData);
    const basketError = useSelector(getBasketError);

    const [isAlert, setIsAlert] = useState<boolean>(false);

    const authData = useSelector(getUserAuthData);

    useEffect(() => {
        if (authData?.id) {
            dispatch(fetchBasketByUserId(authData?.id));
        }
    }, [authData?.id, dispatch]);

    const createOrderHandler = useCallback(() => {
        dispatch(createOrder({ userId: authData?.id, basketId: basket?.id }));
        setIsAlert(true);
        if (authData?.id) {
            dispatch(fetchBasketByUserId(authData?.id));
        }
    }, [authData?.id, basket?.id, dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(classes.BasketPage, {}, [className])}>
                <Alert
                    show={isAlert}
                    onClose={() => setIsAlert(false)}
                    variant="success"
                    dismissible
                >
                    <Alert.Heading>Заказ успешно создан</Alert.Heading>
                    <p>
                        Отследить статус заказа можно в разделе
                        {' '}
                        <AppLink
                            to="/orders"
                        >
                            Заказы
                        </AppLink>
                    </p>
                </Alert>

                {basket?.products?.length
                    ? (
                        <>
                            <h2>Корзина</h2>
                            <BasketCard basket={basket} />
                            <Button
                                onClick={createOrderHandler}
                            >
                                Сделать заказ
                            </Button>
                        </>
                    )
                    : (
                        <Alert
                            variant="info"
                        >
                            <h2>Корзина пуста!</h2>
                            <AppLink
                                theme={AppLinkTheme.OUTLINED_INVERTED}
                                to="/shop"
                            >
                                За покупками!
                            </AppLink>
                        </Alert>
                    )}
            </Page>
        </DynamicModuleLoader>
    );
});

export default BasketPage;
