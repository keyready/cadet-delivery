const { DataTypes } = require('sequelize');
const DB = require('../db/db');

module.exports = DB.define(
    'user',
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'user',
        },
        payment_link: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
    },
);
