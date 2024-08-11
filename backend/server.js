const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // For environment variables

const app = express();
const port = process.env.PORT || 5000; // Use PORT from .env file or default to 5000

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Routes
app.get('/flashcards', (req, res) => {
    db.query('SELECT * FROM flashcards', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

app.get('/flashcards/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM flashcards WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results[0]);
    });
});

app.post('/flashcards', (req, res) => {
    const { question, answer } = req.body;
    db.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [question, answer], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, question, answer });
    });
});

app.put('/flashcards/:id', (req, res) => {
    const id = req.params.id;
    const { question, answer } = req.body;
    db.query('UPDATE flashcards SET question = ?, answer = ? WHERE id = ?', [question, answer, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id, question, answer });
    });
});

app.delete('/flashcards/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM flashcards WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(204).send();
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
