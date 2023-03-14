import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import {
    Badge, Button, ButtonGroup, Card,
} from 'react-bootstrap';
import { Product } from 'entities/Product';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { updateUserBasket } from 'entities/Basket/model/services/updateUserBasket';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import classes from './ProductCard.module.scss';

interface ProductCardProps {
    className?: string;
    product?: Product;
    serverAmount?: number
}

export const ProductCard = memo((props: ProductCardProps) => {
    const {
        className,
        product,
        serverAmount,
    } = props;

    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);

    const [isButtonHovered, setIsButtonHovered] = useState<boolean>(!!serverAmount);
    const [amount, setAmount] = useState<number>(serverAmount || 0);

    const onMouseLeaveHandler = useCallback(() => {
        if (amount) return;
        setIsButtonHovered(false);
    }, [amount]);

    const removeProductHandler = useCallback(() => {
        const nextAmount = amount - 1 <= 0 ? 0 : amount - 1;
        setAmount(nextAmount);

        if (amount <= 0) setAmount(0);

        dispatch(updateUserBasket({
            userId: authData?.id,
            productsId: product?.id,
            productsAmount: nextAmount,
        }));
    }, [amount, authData?.id, dispatch, product?.id]);

    const addProductHandler = useCallback(() => {
        const nextAmount = amount + 1;
        setAmount(nextAmount);

        dispatch(updateUserBasket({
            userId: authData?.id,
            productsId: product?.id,
            productsAmount: nextAmount,
        }));
    }, [amount, authData?.id, dispatch, product?.id]);

    return (
        <div className={classNames(classes.ProductCard, {}, [className])}>
            <Card
                className={classes.card}
                style={{ width: '18rem' }}
            >
                <Card.Img variant="top" src="https://placehold.co/150x100" />
                <Card.Body>
                    <Card.Title>
                        {product?.title}
                        <Badge bg="info">{product?.provider}</Badge>
                    </Card.Title>
                    <Card.Text>{product?.description}</Card.Text>
                    <Card.Text>{product?.cost}</Card.Text>
                    <span
                        onMouseEnter={() => setIsButtonHovered(true)}
                        onMouseLeave={onMouseLeaveHandler}
                    >
                        {!isButtonHovered && (
                            <Button
                                variant="primary"
                            >
                                В корзину
                            </Button>
                        )}
                        {isButtonHovered && (
                            <ButtonGroup>
                                <Button
                                    variant="danger"
                                    onClick={removeProductHandler}
                                >
                                    -
                                </Button>
                                <Button variant="outline-secondary" disabled>{amount}</Button>
                                <Button
                                    variant="success"
                                    onClick={addProductHandler}
                                >
                                    +
                                </Button>
                            </ButtonGroup>
                        )}
                    </span>
                </Card.Body>
            </Card>
        </div>
    );
});
