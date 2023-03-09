const { DataTypes } = require('sequelize');
const DB = require('../db/db');

module.exports = DB.define('order', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
