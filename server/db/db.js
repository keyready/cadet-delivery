const {Sequelize} = require('sequelize');

module.exports = new Sequelize("cadet-delivery", "postgres", "userSQL", {
    dialect: "postgres",
    host: 'localhost',
    port: 5432,
    define: {
        timestamps: false
    }
});
