const UserModel = require('./User.model');
const OrderModel = require('./Order.model');
const BasketModel = require('./Basket.model');
const ProductsModel = require('./Product.model');

UserModel.hasOne(BasketModel);

UserModel.hasMany(OrderModel);
OrderModel.belongsTo(UserModel);

// OrderModel.hasMany(BasketModel);
// OrderModel.belongsTo(BasketModel);

module.exports = {
    UserModel,
    BasketModel,
    ProductsModel,
    OrderModel,
};
