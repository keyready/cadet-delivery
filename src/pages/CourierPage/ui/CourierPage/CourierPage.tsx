import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo, useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    acceptOrder, fetchAllOrders, getOrders, ordersReducer,
} from 'features/fetchOrders';
import { useSelector } from 'react-redux';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { buyOrder, completeOrder } from 'entities/Order';
import { Tab, Tabs } from 'react-bootstrap';
import { getUserAuthData } from 'entities/User';
import { AllOrdersList } from '../AllOrdersList/AllOrdersList';
import { AcceptedOrdersList } from '../AcceptedOrdersList/AcceptedOrdersList';
import classes from './CourierPage.module.scss';

interface CourierPageProps {
    className?: string;
}

const reducers: ReducersList = {
    Orders: ordersReducer,
};

const CourierPage = memo((props: CourierPageProps) => {
    const {
        className,
    } = props;

    const dispatch = useAppDispatch();

    const authData = useSelector(getUserAuthData);
    const orders = useSelector(getOrders.selectAll);

    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);

    const acceptOrderHandler = useCallback((orderId) => {
        dispatch(acceptOrder({
            courierId: authData?.id,
            orderId,
        }));
        dispatch(fetchAllOrders());
    }, [authData?.id, dispatch]);

    const completedOrderHandler = useCallback((orderId) => {
        dispatch(completeOrder(orderId));
        dispatch(fetchAllOrders());
    }, [dispatch]);

    const buyOrderHandler = useCallback((orderId) => {
        dispatch(buyOrder(orderId));
        dispatch(fetchAllOrders());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(classes.CourierPage, {}, [className])}>

                <h2>Страница курьера</h2>

                <Tabs
                    defaultActiveKey="allOrders"
                    className="mb-3"
                >
                    <Tab eventKey="allOrders" title="Все заказы">
                        <AllOrdersList
                            orders={orders}
                            acceptOrderHandler={acceptOrderHandler}
                            completedOrderHandler={completedOrderHandler}
                            buyOrderHandler={buyOrderHandler}
                        />
                    </Tab>
                    <Tab eventKey="acceptedOrders" title="Принятые">
                        <AcceptedOrdersList
                            orders={orders}
                        />
                    </Tab>
                    <Tab eventKey="contact" title="Завершенные" disabled>
                        В разработке
                    </Tab>
                </Tabs>
            </Page>
        </DynamicModuleLoader>
    );
});

export default CourierPage;
