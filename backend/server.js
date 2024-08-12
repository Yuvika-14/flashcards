const express = require('express');
const mysql = require('mysql');
const cors = require('cors');



// Rest of your code


const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Yuvika@123',
    database: 'cards'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Get all flashcards
/*app.get('/api/flashcards', (req, res) => {
    const sql = 'SELECT * FROM flashcards';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});
*/
// Add a flashcard
app.get('/api/flashcards', (req, res) => {
    const sql = 'SELECT * FROM flashcards';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/cards', (req, res) => {
    const { question, answer } = req.body;
    const sql = 'INSERT INTO flashcards (question, answer) VALUES (?, ?)';
    db.query(sql, [question, answer], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, question, answer });
    });
});

// Update a flashcard
app.put('/flashcards/:id', (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;

    const sql = `UPDATE flashcards SET question = ?, answer = ? WHERE id = ?`;
    db.query(sql, [question, answer, id], (err, result) => {
        if (err) {
            console.error('Error updating card:', err);
            res.status(500).send('Error updating card');
            return;
        }
        res.status(200).json({ id, question, answer });
    });
});

// Delete a flashcard/

app.delete('/flashcards/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM flashcards WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Flashcard deleted' });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
