import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Order } from 'entities/Order';
import { Table } from 'react-bootstrap';
import { Product } from 'entities/Product';
import classes from './OrderCard.module.scss';

interface OrderCardProps {
    className?: string;
    products?: Product[];
}

export const OrderCard = memo((props: OrderCardProps) => {
    const {
        className,
        products,
    } = props;

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Название</th>
                    <th>Количество</th>
                    <th>Сумма</th>
                </tr>
            </thead>
            <tbody>
                {products?.length
                    ? products.map((product, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{product.title}</td>
                            <td>{product.amount}</td>
                            <td>
                                {product.amount
                                    ? product.cost * product.amount
                                    : '0'}
                            </td>
                        </tr>
                    ))
                    : ''}
            </tbody>
        </Table>
    );
});
