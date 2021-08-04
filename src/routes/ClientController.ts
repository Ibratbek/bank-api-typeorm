import express, { Request, Response } from 'express';
import { Client } from '../entities/Client';

const router = express.Router();

router.post('/api/client', async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, cardNumber, balance } = req.body;

        const client = Client.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            cardNumber: cardNumber,
            balance: balance
        });

        await client.save();
        return res.json(client);
    } catch (error) {
        return res.send(error.message)
    }
});

router.get('/api/clients', async (req, res) => {
    const clients = await Client.find();
    res.json(clients)
});

router.delete('/api/clients/:id', async (req, res) => {
    const clientId = req.params.id;

    await Client.delete(parseInt(clientId));

    return res.json({
        msg: "Deleted Clint"
    });
});

export {
    router as ClientController
}