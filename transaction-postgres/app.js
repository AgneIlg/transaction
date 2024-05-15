const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');

const app = express();


app.use(bodyParser.json());

// CRUD operations for transactions
// Create a transaction
app.post('/transactions', async (req, res) => {
    const { amount, user_from, user_to } = req.body;
    try {
        const newTransaction = await pool.query(
            'INSERT INTO "Transaction" (amount, user_from, user_to) VALUES ($1, $2, $3) RETURNING *',
            [amount, user_from, user_to]
        );
        res.json(newTransaction.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Read all transactions
app.get('/transactions', async (req, res) => {
    try {
        const allTransactions = await pool.query('SELECT * FROM "Transaction"');
        res.json(allTransactions.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update a transaction
app.put('/transactions/:id', async (req, res) => {
    const { id } = req.params;
    const { amount, user_from, user_to } = req.body;
    try {
        const updatedTransaction = await pool.query(
            'UPDATE "Transaction" SET amount = $1, user_from = $2, user_to = $3 WHERE id = $4 RETURNING *',
            [amount, user_from, user_to, id]
        );
        res.json(updatedTransaction.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete a transaction
app.delete('/transactions/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM "Transaction" WHERE id = $1', [id]);
        res.json('Transaction deleted');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});




// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });



module.exports = app;