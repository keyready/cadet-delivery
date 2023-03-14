import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchProducts } from 'pages/ShopPage/model/services/fetchProducts';
import { getProducts, productsReducer } from 'pages/ShopPage/model/slice/productsSlice';
import { useSelector } from 'react-redux';
import { getProductsError, getProductsIsLoading } from 'pages/ShopPage';
import { ProductCard } from 'entities/Product/ui/ProductCard';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { getBasketData } from 'entities/Basket/model/selectors/Basket';
import { fetchBasketByUserId } from 'entities/Basket/model/services/fetchBasketByUserId';
import { getUserAuthData } from 'entities/User';
import { BasketReducer } from 'entities/Basket';
import classes from './ShopPage.module.scss';

interface ShopPageProps {
    className?: string;
}

const reducer: ReducersList = {
    Products: productsReducer,
    Basket: BasketReducer,
};

const ShopPage = memo((props: ShopPageProps) => {
    const {
        className,
    } = props;

    const dispatch = useAppDispatch();

    const products = useSelector(getProducts.selectAll);
    const authData = useSelector(getUserAuthData);
    const basket = useSelector(getBasketData);
    const isLoading = useSelector(getProductsIsLoading);
    const error = useSelector(getProductsError);

    useEffect(() => {
        if (authData) {
            dispatch(fetchProducts(authData.id));
            dispatch(fetchBasketByUserId(authData.id));
        }
    }, [authData, dispatch]);

    return (
        <DynamicModuleLoader reducers={reducer}>
            <Page className={classNames(classes.ShopPage, {}, [className])}>
                <h2>Магазин</h2>
                <div className={classes.productsList}>
                    {products.length
                        ? products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                serverAmount={product.amount ? product.amount : 0}
                            />
                        ))
                        : ''}
                </div>
            </Page>
        </DynamicModuleLoader>
    );
});

export default ShopPage;
