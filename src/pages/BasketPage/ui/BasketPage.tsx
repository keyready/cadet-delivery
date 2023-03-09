import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { fetchBasketByUserId } from 'entities/Basket/model/services/fetchBasketByUserId';
import { getBasketData } from 'entities/Basket/model/selectors/Basket';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { BasketReducer } from 'entities/Basket';
import { BasketCard } from 'entities/Basket/ui/BasketCard';
import classes from './BasketPage.module.scss';

interface BasketPageProps {
    className?: string;
}

const reducers: ReducersList = {
    basket: BasketReducer,
};

const BasketPage = memo((props: BasketPageProps) => {
    const {
        className,
    } = props;

    const dispatch = useAppDispatch();
    const basket = useSelector(getBasketData);

    const authData = useSelector(getUserAuthData);

    useEffect(() => {
        if (authData?.id) {
            dispatch(fetchBasketByUserId(authData?.id));
        }
    }, [authData?.id, dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(classes.BasketPage, {}, [className])}>
                <h2>Корзина</h2>
                {basket && <BasketCard basket={basket} />}
            </Page>
        </DynamicModuleLoader>
    );
});

export default BasketPage;
