import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import {
    FormEvent, memo, useCallback, useState,
} from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { createProduct } from 'entities/Product/model/services/createProduct';
import { Product } from 'entities/Product';
import classes from './AdminPage.module.scss';

interface AdminPageProps {
    className?: string;
}

const AdminPage = memo((props: AdminPageProps) => {
    const {
        className,
    } = props;

    const dispatch = useAppDispatch();

    const [newProduct, setNewProduct] = useState<Product>({
        title: '',
        description: '',
        cost: 0,
        provider: '',
    });

    const createProductHandler = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(createProduct(newProduct));
    }, [dispatch, newProduct]);

    return (
        <Page className={classNames(classes.AdminPage, {}, [className])}>
            <h2>Админка</h2>
            <Form
                onSubmit={createProductHandler}
            >
                <Form.Group className="mb-3">
                    <Form.Label>Название продукта</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Шаверма с печенью твоей мамки"
                        onChange={(e) => setNewProduct({
                            ...newProduct,
                            title: e.target.value,
                        })}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Поставщик</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Кладбище № 2"
                        onChange={(e) => setNewProduct({
                            ...newProduct,
                            provider: e.target.value,
                        })}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Описание продукта</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        onChange={(e) => setNewProduct({
                            ...newProduct,
                            description: e.target.value,
                        })}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Стоимость</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="999"
                        onChange={(e) => setNewProduct({
                            ...newProduct,
                            cost: Number(e.target.value),
                        })}
                    />
                </Form.Group>
                <Button
                    type="submit"
                    variant="primary"
                >
                    Добавить
                </Button>
            </Form>
        </Page>
    );
});

export default AdminPage;
