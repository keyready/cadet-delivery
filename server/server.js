/* eslint-disable no-return-assign */
const PORT = 9999;

const express = require('express');
const path = require('path');
const crypto = require('crypto');
const cors = require('cors');
const { order } = require('stylelint-order/rules');
const DB = require('./db/db');
const {
    BasketModel, UserModel, ProductsModel, OrderModel,
} = require('./models/index');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const candidate = await UserModel.findOne({ where: { username }, raw: true });
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
    if (basket.length === 1) {
        existedProducts = await ProductsModel.findAll({
            where: { id: basket[0].productsId },
            raw: true,
        });

        existedProducts.map((item, index) => item.amount = basket[0].productsAmount[index]);

        for (let i = 0; i < products.length; i += 1) {
            for (let j = 0; j < existedProducts.length; j += 1) {
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
    console.log(userId);

    const basket = await BasketModel.findAll({ where: { userId }, raw: true });

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

    if (!basket.length) {
        res.status(404).json({ message: 'Корзина пустая' });
        return;
    }

    const products = await ProductsModel.findAll({
        where: { id: basket[0].productsId },
        raw: true,
    });

    products.map((item, index) => item.amount = basket[0].productsAmount[index]);
    products.map((item, index) => item.price = item.cost * basket[0].productsAmount[index]);

    res.status(200).json({
        id: basket[0].id,
        products,
    });
});

app.post('/createProduct', async (req, res) => {
    const { newProduct } = req.body;

    await ProductsModel.create({
        title: newProduct.title,
        description: newProduct.description,
        provider: newProduct.provider,
        cost: newProduct.cost,
    });

    res.status(200).json({ message: 'успешно добавлено' });
});

app.post('/createOrder', async (req, res) => {
    const { basketId, userId } = req.body;

    const order = await OrderModel.create({
        userId,
        productsIds: [],
        productsAmount: [],
    });

    const fromBasket = await BasketModel.findByPk(basketId);

    const productsIds = [];
    fromBasket.productsId.forEach((item) => {
        productsIds.push(item);
    });
    const productsAmount = [];
    fromBasket.productsAmount.forEach((item) => {
        productsAmount.push(item);
    });

    order.productsIds = productsIds;
    order.productsAmount = productsAmount;
    await order.save();

    fromBasket.productsId = [];
    fromBasket.productsAmount = [];
    await fromBasket.save();

    await OrderModel.findByPk(order.id);

    res.status(200).json({});
});

app.post('/orders', async (req, res) => {
    /**
     * Крыса фекальная
     *
     * (с) бамбург, 0:51 11.03.2023
     */

    const { userId } = req.body;

    let orders = [];
    if (userId) {
        orders = await OrderModel.findAll({ where: { userId }, raw: true });
    } else {
        orders = await OrderModel.findAll({ raw: true });
    }

    let products = [];
    for (let i = 0; i < orders.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        products = await ProductsModel.findAll({
            where: { id: orders[i].productsIds },
            raw: true,
        });

        for (let j = 0; j < products.length; j += 1) {
            products[j].amount = orders[i].productsAmount[j];
        }

        orders[i].products = products;
        delete orders[i].productsIds;
        delete orders[i].productsAmount;
    }

    res.status(200).json(orders);
});

app.post('/accept_order', async (req, res) => {
    const { orderId, courierId } = req.body;

    const courier = await UserModel.findOne({ where: { id: courierId }, raw: true });

    const newStatus = `Заказ принят курьером ${courier.username}`;

    console.log(courier);

    await OrderModel.update(
        {
            status: newStatus,
            courierPaymentLink: courier.payment_link,
        },
        { where: { id: orderId } },
    );

    const orders = await OrderModel.findAll({ raw: true });
    let products = [];
    for (let i = 0; i < orders.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        products = await ProductsModel.findAll({
            where: { id: orders[i].productsIds },
            raw: true,
        });

        for (let j = 0; j < products.length; j += 1) {
            products[j].amount = orders[i].productsAmount[j];
        }

        orders[i].products = products;
        delete orders[i].productsIds;
        delete orders[i].productsAmount;
    }

    res.status(200).json(orders);
});

app.post('/confirm_payment', async (req, res) => {
    const { orderId } = req.body;

    await OrderModel.update(
        { paid: true },
        { where: { id: orderId } },
    );

    res.status(200).json({});
});

app.post('/buy_order', async (req, res) => {
    const { orderId } = req.body;

    await OrderModel.update(
        { status: 'Заказ выкуплен' },
        { where: { id: orderId } },
    );

    res.status(200).json({});
});
app.post('/complete_order', async (req, res) => {
    const { orderId } = req.body;

    await OrderModel.update(
        { status: 'Заказ выполнен' },
        { where: { id: orderId } },
    );

    res.status(200).json({});
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
