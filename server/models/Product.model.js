const { DataTypes } = require('sequelize');
const DB = require('../db/db');

module.exports = DB.define(
    'product',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        provider: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
);
