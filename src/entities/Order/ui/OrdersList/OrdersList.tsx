import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Badge, Button } from 'react-bootstrap';
import { OrderCard } from 'entities/Order';
import classes from './OrdersList.module.scss';
import { Order } from '../../model/types/Order';

interface OrdersListProps {
    className?: string;
    orders: Order[];
    paymentHandler?: (link?: string, id?: number) => void;
}

export const OrdersList = memo((props: OrdersListProps) => {
    const {
        className,
        orders,
        paymentHandler,
    } = props;

    return (
        <div className={classNames(classes.OrdersList, {}, [className])}>
            {orders.map((order, index) => (
                <div className={classes.orderCard}>
                    <h2>
                        {`${index + 1} | ${order.status}  `}
                        {order.paid
                            ? <Badge bg="success">Оплачено</Badge>
                            : <Badge bg="warning">Ждет оплаты</Badge>}
                    </h2>
                    <OrderCard products={order.products} />
                    {!order.paid && order.status !== 'Заказ создан'
                        ? (
                            <Button
                                onClick={
                                    () => paymentHandler?.(order.courierPaymentLink, order.id)
                                }
                                variant="success"
                            >
                                Оплатить
                            </Button>
                        )
                        : ''}
                </div>
            ))}
        </div>
    );
});
