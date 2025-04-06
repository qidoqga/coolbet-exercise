import { Router } from 'express';
import { getCustomers, getLeaderboard } from './db/queries/customer';
import { knex } from "knex";

export const router = Router();

router.get('/customers', async (req, res) => {
    const customers = await getCustomers();
    res.json(customers);
});


router.get('/leaderboard', async (req, res) => {
    const country = req.query.country || 'ALL';
    try {
        const leaderboard = await getLeaderboard(knex, country as string);
        res.json(leaderboard);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;