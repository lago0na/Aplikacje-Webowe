const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'super_tajny_klucz';

app.use(bodyParser.json());

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './books.sqlite'
});


const Book = sequelize.define('Book', {
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: false }
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


app.get('/api/books', async (req, res) => {
    const books = await Book.findAll();
    res.json(books);
});


app.get('/api/books/:bookId', async (req, res) => {
    const book = await Book.findByPk(req.params.bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
});


app.post('/api/books', authenticateToken, async (req, res) => {
    try {
        const { title, author, year } = req.body;
        const book = await Book.create({ title, author, year });
        res.json({ id: book.id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


app.delete('/api/books/:bookId', authenticateToken, async (req, res) => {
    await Book.destroy({ where: { id: req.params.bookId } });
    res.json({ message: 'Book deleted' });
});

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Books Service running on port ${PORT}`));
});