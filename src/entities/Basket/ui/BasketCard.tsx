import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Table } from 'react-bootstrap';
import { Basket } from '../model/types/Basket';
import classes from './BasketCard.module.scss';

interface BasketProps {
    className?: string;
    basket?: Basket;
}

export const BasketCard = memo((props: BasketProps) => {
    const {
        className,
        basket,
    } = props;

    return (
        <div className={classNames(classes.Basket, {}, [className])}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Название</th>
                        <th>Поставщик</th>
                        <th>Количество</th>
                        <th>Цена</th>
                        <th>Стоимость</th>
                    </tr>
                </thead>
                <tbody>
                    {basket?.products
                        ? basket.products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.title}</td>
                                <td>{product.provider}</td>
                                <td>{product.provider}</td>
                                <td>{product.amount}</td>
                                <td>{product.cost}</td>
                                <td>{product.price}</td>
                            </tr>
                        ))
                        : ''}
                    <tr>
                        <th colSpan={2}>Итого</th>
                        <th colSpan={4}>хуй с солью</th>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
});
