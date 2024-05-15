const request = require('supertest');
const app = require('./app');

describe('GET /transactions', () => {
    test('responds with JSON message', async () => {
        const response = await request(app).get('/transactions');
        expect(response.statusCode).toBe(200);
    
    });
});


describe('POST /transactions', () => {
    it('should create a new transaction', async () => {
        const transactionData = {
            amount: "100",
            user_from: 1,
            user_to: 2
        };

        const response = await request(app)
            .post('/transactions')
            .send(transactionData)
            .expect(200);

        expect(response.body.amount).toBe(transactionData.amount);
        expect(response.body.user_from).toBe(transactionData.user_from);
        expect(response.body.user_to).toBe(transactionData.user_to);
    });
});

describe('GET /transactions', () => {
    it('should get all transactions', async () => {
        const response = await request(app)
            .get('/transactions')
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
    });
});

// describe('PUT /transactions/:id', () => {
//     it('should update a transaction', async () => {
//         // Assuming there's an existing transaction with ID 1
//         const transactionId = 1;
//         const updatedTransactionData = {
//             amount: 150,
//             user_from: 'user3',
//             user_to: 'user4'
//         };

//         const response = await request(app)
//             .put(`/transactions/${transactionId}`)
//             .send(updatedTransactionData)
//             .expect(200);

//         expect(response.body.amount).toBe(updatedTransactionData.amount);
//         expect(response.body.user_from).toBe(updatedTransactionData.user_from);
//         expect(response.body.user_to).toBe(updatedTransactionData.user_to);
//     });
// });

// describe('DELETE /transactions/:id', () => {
//     it('should delete a transaction', async () => {
//         // Assuming there's an existing transaction with ID 1
//         const transactionId = 1;

//         const response = await request(app)
//             .delete(`/transactions/${transactionId}`)
//             .expect(200);

//         expect(response.text).toBe('Transaction deleted');
//     });
// });
