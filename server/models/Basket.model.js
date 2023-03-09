const { DataTypes } = require('sequelize');
const DB = require('../db/db');

module.exports = DB.define('basket', {
    productsId: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
    },
    productsAmount: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
    },
});
