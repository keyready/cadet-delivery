import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Order } from 'entities/Order';
import classes from './AcceptedOrdersList.module.scss';

interface AcceptedOrdersListProps {
    className?: string;
    orders: Order[];
}

export const AcceptedOrdersList = memo((props: AcceptedOrdersListProps) => {
    const {
        className,
        orders,
    } = props;

    const isItemIncluded = useCallback((wantedItem, list) => {
        for (let i = 0; i < list.length; i += 1) {
            if (list[i] === wantedItem) return true;
        }

        return false;
    }, []);

    const generateAcceptedOrders = useCallback(() => {
        const acceptedOrders = [...orders].filter((order) => {
            if (order.status) return order.status.includes('Заказ принят');
        });

        const allAcceptedProducts = [];
        for (let i = 0; i < acceptedOrders.length; i += 1) {
            for (let j = 0; j < acceptedOrders[i].products.length; j += 1) {
                allAcceptedProducts.push(acceptedOrders[i].products[j]);
            }
        }

        const result = new Map();

        for (let i = 0; i < allAcceptedProducts.length; i += 1) {
            if (result.has(allAcceptedProducts[i].title)) {
                result.set(
                    allAcceptedProducts[i].title,
                    result.get(allAcceptedProducts[i].title) + allAcceptedProducts[i].amount,
                );
            } else {
                result.set(
                    allAcceptedProducts[i].title,
                    allAcceptedProducts[i].amount,
                );
            }
        }

        const RESULT: {title: string, amount: number}[] = [];
        result.forEach((key, value) => RESULT.push({ title: value, amount: key }));

        return RESULT;
    }, [orders]);

    return (
        <div className={classNames(classes.AcceptedOrdersList, {}, [className])}>
            {generateAcceptedOrders().map((item) => (
                <div key={item.title}>
                    <span>{item.title}</span>
                    <span>{' - '}</span>
                    <span>{item.amount}</span>
                </div>
            ))}
        </div>
    );
});
