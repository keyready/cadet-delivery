const UserModel = require('./User.model');
const BasketModel = require('./Basket.model');
const ProductsModel = require('./Product.model');

UserModel.hasOne(BasketModel);

module.exports = {
    UserModel,
    BasketModel,
    ProductsModel,
};
