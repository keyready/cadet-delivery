export {
    OrdersPageLazy as OrdersPage,
} from './ui/OrdersPage.lazy';

export {
    OrdersSchema,
} from '../../features/fetchOrders/model/types/OrdersSchema';

export {
    fetchOrdersByUserId,
} from '../../features/fetchOrders/model/services/fetchOrdersByUserId';

export {
    getOrdersIsLoading,
    getOrdersError,
} from '../../features/fetchOrders/model/selectors/ordersSelector';
