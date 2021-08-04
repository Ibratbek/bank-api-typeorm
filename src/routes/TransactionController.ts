import express from 'express';
import { Client } from '../entities/Client';
import { Transaction, TransactionsType } from '../entities/Transaction';

const router = express.Router();

router.post('/api/client/:clientId/transaction', async (req, res) => {
    const { clientId } = req.params;
    const { type, amount } = req.body;

    const client = await Client.findOne(parseInt(clientId));

    if (!client) {
        return res.json({
            msg: "Not Found Client"
        });
    }

    const transaction = Transaction.create({
        amount,
        type,
        client
    });

    await transaction.save()

    if (type === TransactionsType.DEPOSIT) {
        client.balance = client.balance + amount
    } else if (type === TransactionsType.WITHDRAW) {
        client.balance = client.balance - amount
    }

    await client.save()

    return res.json({
        msg: "transaction added"
    })
});

router.get('/api/transactions', async (req, res) => {
    const transactions = await Transaction.find();
    res.json(transactions)
});

export {
    router as TransactionController
}