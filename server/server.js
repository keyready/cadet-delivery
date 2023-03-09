/* eslint-disable no-return-assign */
const PORT = 9999;

const express = require('express');
const path = require('path');
const crypto = require('crypto');
const cors = require('cors');
const DB = require('./db/db');
const { BasketModel, UserModel } = require('./models/index');
const { ProductsModel } = require('./models');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const candidate = await UserModel.findOne({ where: { username }, raw: true });
    console.log(candidate);
    if (candidate) {
        res.status(405).json({ message: 'Username уже занят' });
        return;
    }

    const user = await UserModel.create({
        username,
        password,
    });
    const basket = await BasketModel.create({
        userId: user.id,
    });

    res.status(200).json({ message: 'Регистрация успешна, корзина создана' });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const candidate = await UserModel.findOne({ where: { username }, raw: true });
    if (candidate) {
        if (candidate.password === password) {
            delete candidate.password;
            res.status(200).json(candidate);
        } else {
            res.status(403).json({ message: 'пароль неправильный' });
        }
    } else {
        res.status(404).json({ message: 'пользователя не существует' });
    }
});

app.get('/show', async (req, res) => {
    // const users = await Order.findAll({ raw: true });

    res.json({}).status(200);
});

app.post('/products', async (req, res) => {
    const { userId } = req.body;

    const products = await ProductsModel.findAll({ raw: true });

    const basket = await BasketModel.findAll({
        where: { userId },
        raw: true,
    });

    let existedProducts = [];
    if (basket) {
        existedProducts = await ProductsModel.findAll({
            where: { id: basket[0].productsId },
            raw: true,
        });

        existedProducts.map((item, index) => item.amount = basket[0].productsAmount[index]);

        for (let i = 0; i < products.length; i++) {
            for (let j = 0; j < existedProducts.length; j++) {
                if (products[i].id === existedProducts[j].id) {
                    products[i] = existedProducts[j];
                }
            }
        }
    }

    res.status(200).json(products);
});

app.post('/basket', async (req, res) => {
    const { userId, productsId, productsAmount } = req.body;

    const basket = await BasketModel.findAll({ where: userId, raw: true });

    const existedProducts = basket[0].productsId;
    const existedProductsAmount = basket[0].productsAmount;

    if (!existedProducts.includes(productsId)) {
        existedProducts.push(productsId);
    }
    existedProductsAmount[existedProducts.indexOf(productsId)] = productsAmount;

    if (productsAmount === 0) {
        const index = existedProducts.indexOf(productsId);
        existedProducts.splice(index, 1);
        existedProductsAmount.splice(index, 1);
    }

    await BasketModel.update(
        { productsId: existedProducts, productsAmount: existedProductsAmount },
        { where: { userId } },
    );

    res.status(200).json({});
});

app.get('/basket/:userId', async (req, res) => {
    const { userId } = req.params;

    const basket = await BasketModel.findAll({
        where: { userId },
        raw: true,
    });

    const products = await ProductsModel.findAll({
        where: { id: basket[0].productsId },
        raw: true,
    });

    products.map((item, index) => item.amount = basket[0].productsAmount[index]);
    products.map((item, index) => item.price = item.cost * basket[0].productsAmount[index]);

    res.status(200).json({
        products,
    });
});

app.post('/createProduct', async (req, res) => {
    const { newProduct } = req.body;

    console.log(newProduct);

    await ProductsModel.create({
        title: newProduct.title,
        description: newProduct.description,
        provider: newProduct.provider,
        cost: newProduct.cost,
    });

    res.status(200).json({ message: 'успешно добавлено' });
});
const StartApp = async () => {
    try {
        // await DB.sync({ force: true });
        await DB.sync();
        await app.listen(PORT, () => {
            console.log(`Server started on http://localhost:${PORT}`);
        });
    } catch (e) {
        console.log(e.message);
    }
};

StartApp();
