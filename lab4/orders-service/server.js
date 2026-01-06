const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3002;
const BOOKS_SERVICE_URL = 'http://localhost:3001/api/books';
const JWT_SECRET = 'super_tajny_klucz';

app.use(bodyParser.json());

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './orders.sqlite'
});

const Order = sequelize.define('Order', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    bookId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false }
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.get('/api/orders/:userId', async (req, res) => {
    const orders = await Order.findAll({ where: { userId: req.params.userId } });
    res.json(orders);
});

app.post('/api/orders', authenticateToken, async (req, res) => {
    const { userId, bookId, quantity } = req.body;

    try {
        await axios.get(`${BOOKS_SERVICE_URL}/${bookId}`);
    } catch (error) {
        return res.status(404).json({ message: 'Książka o podanym ID nie istnieje (błąd serwisu książek)' });
    }

    try {
        const order = await Order.create({ userId, bookId, quantity });
        res.json({ id: order.id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/orders/:orderId', authenticateToken, async (req, res) => {
    await Order.destroy({ where: { id: req.params.orderId } });
    res.json({ message: 'Order deleted' });
});

app.patch('/api/orders/:orderId', authenticateToken, async (req, res) => {
    try {
        const { quantity } = req.body;
        await Order.update({ quantity }, { where: { id: req.params.orderId } });
        res.json({ message: 'Order updated' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Orders Service running on port ${PORT}`));
});