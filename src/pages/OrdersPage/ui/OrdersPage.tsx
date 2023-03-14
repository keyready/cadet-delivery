import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import {
    memo, useCallback, useEffect, useState,
} from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import {
    Alert, Badge, Button, Modal, Table,
} from 'react-bootstrap';
import {
    getOrderError,
    getOrderIsLoading,
    OrderCard, OrdersList,
} from 'entities/Order';
import { PageLoader } from 'shared/UI/PageLoader';
import { AppLink } from 'shared/UI/AppLink';
import { AppLinkTheme } from 'shared/UI/AppLink/ui/AppLink';
import {
    fetchOrdersByUserId,
    getOrders, ordersReducer,
} from 'features/fetchOrders';
import { confirmPayment } from 'entities/Order/model/services/confirmPayment';
import classes from './OrdersPage.module.scss';

interface OrdersPageProps {
    className?: string;
}

const reducers: ReducersList = {
    Orders: ordersReducer,
};

const OrdersPage = memo((props: OrdersPageProps) => {
    const {
        className,
    } = props;

    const dispatch = useAppDispatch();

    const authData = useSelector(getUserAuthData);
    const orders = useSelector(getOrders.selectAll);
    const isLoading = useSelector(getOrderIsLoading);
    const ordersError = useSelector(getOrderError);

    const [commonAmount, setCommonAmount] = useState<number>(0);
    const [linkSeen, setLinkSeen] = useState<boolean>(false);
    const [courierPaymentLink, setCourierPaymentLink] = useState<string>('');
    const [orderId, setOrderId] = useState<number>(0);

    useEffect(() => {
        if (authData) {
            dispatch(fetchOrdersByUserId(authData.id));
        }
    }, [authData, dispatch]);

    const confirmPaymentHandler = useCallback(() => {
        dispatch(confirmPayment({ orderId }));
        if (authData) {
            dispatch(fetchOrdersByUserId(authData.id));
        }
        setLinkSeen(false);
    }, [authData, dispatch, orderId]);

    const paymentHandler = useCallback((link, orderId) => {
        setCourierPaymentLink(link);
        setLinkSeen(true);
        setOrderId(orderId);
    }, []);

    if (isLoading) {
        return (
            <Page className={classNames(classes.OrdersPage, {}, [className])}>
                <PageLoader />
            </Page>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(classes.OrdersPage, {}, [className])}>
                {ordersError && (
                    <Alert>Произошла какая-то ошибка</Alert>
                )}
                <Modal show={linkSeen} onHide={() => setLinkSeen(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ссылка для оплаты</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Alert.Link
                            as="a"
                            target="__blank"
                            onClick={confirmPaymentHandler}
                            href={courierPaymentLink}
                        >
                            Оплатить
                        </Alert.Link>
                        <Modal.Footer>
                            Момент оплаты никак не отслеживается, так что после перехода по ссылке статус заказа
                            меняется на "Оплачено". Если вы не оплатите заказ, очевидно, вам ничего не доставят
                        </Modal.Footer>
                    </Modal.Body>
                </Modal>
                {orders.length && (
                    <OrdersList
                        orders={orders}
                        paymentHandler={paymentHandler}
                    />
                )}
                {!orders.length && (
                    <Alert
                        variant="info"
                    >
                        <h2>Заказов пока нет!</h2>
                        <AppLink
                            theme={AppLinkTheme.OUTLINED_INVERTED}
                            to="/basket"
                        >
                            Оформите прямо сейчас!
                        </AppLink>
                    </Alert>
                )}
            </Page>
        </DynamicModuleLoader>
    );
});

export default OrdersPage;
