const { DataTypes } = require('sequelize');
const DB = require('../db/db');

module.exports = DB.define('order', {
    productsIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    productsAmount: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Заказ создан',
    },
    courierId: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    courierPaymentLink: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
    },
    paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});
