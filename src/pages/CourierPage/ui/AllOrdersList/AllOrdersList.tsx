import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Order, OrderCard } from 'entities/Order';
import { Button } from 'react-bootstrap';
import classes from './AllOrdersList.module.scss';

interface AllOrdersListProps {
    className?: string;
    orders: Order[];
    acceptOrderHandler?: (id?: number) => void;
    buyOrderHandler?: (id?: number) => void;
    completedOrderHandler?: (id?: number) => void;
}

export const AllOrdersList = memo((props: AllOrdersListProps) => {
    const {
        className,
        orders,
        acceptOrderHandler,
        buyOrderHandler,
        completedOrderHandler,
    } = props;

    return (
        <div className={classNames(classes.AllOrdersList, {}, [className])}>
            {orders.map((order, index) => (
                <div className={classes.orderCard}>
                    <h2>{`${index + 1} | ${order.status}`}</h2>
                    <OrderCard products={order.products} />
                    {order.status === 'Заказ создан'
                        ? (
                            <Button
                                variant="outline-success"
                                onClick={() => acceptOrderHandler?.(order.id)}
                            >
                                Принять заказ
                            </Button>
                        )
                        : ''}
                    {order.status && order.status.includes('Заказ принят') && order.paid
                        ? (
                            <Button
                                variant="outline-warning"
                                onClick={() => buyOrderHandler?.(order.id)}
                            >
                                Отметить выкупленным
                            </Button>
                        )
                        : ''}
                    {order.status === 'Заказ выкуплен'
                        ? (
                            <Button
                                variant="success"
                                onClick={() => completedOrderHandler?.(order.id)}
                            >
                                Отметить выполненным
                            </Button>
                        )
                        : ''}
                </div>
            ))}
        </div>
    );
});
