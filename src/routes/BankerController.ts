import express, { Request, Response } from 'express';
import { Banker } from '../entities/Banker';

const router = express.Router();

router.post('/api/banker', async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, cardNumber, employeeNumber } = req.body;

        const banker = Banker.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            cardNumber: cardNumber,
            employeeNumber: employeeNumber
        });

        await banker.save();
        return res.json(banker);
    } catch (error) {
        return res.send(error.message)
    }
});

router.get('/api/bankers', async (req, res) => {
    const bankers = await Banker.find();
    res.json(bankers)
});

export {
    router as BankerController
}