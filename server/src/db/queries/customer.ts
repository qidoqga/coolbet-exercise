import { db } from '../knex';

export const getCustomers = () => db('customer').select('*');


export async function getLeaderboard(knex: any, countryFilter: string = 'ALL') {
    let query = knex('customer')
        .join('bet', 'customer.id', 'bet.customer_id')
        .whereIn('bet.status', ['WON', 'LOST'])
        .groupBy('customer.id')
        .select(
            'customer.id',
            knex.raw("CONCAT(customer.first_name, ' ', customer.last_name) as fullName"),
            'customer.country',
            knex.raw("COUNT(*) as totalBets"),
            knex.raw("SUM(CASE WHEN bet.status = 'WON' THEN 1 ELSE 0 END) as wins"),
            knex.raw("SUM(CASE WHEN bet.status = 'WON' THEN (bet.stake * bet.odds - bet.stake) ELSE 0 END) as totalWon"),
            knex.raw("SUM(CASE WHEN bet.status = 'LOST' THEN bet.stake ELSE 0 END) as totalLost")
        );

    if (countryFilter !== 'ALL') {
        query = query.where('customer.country', countryFilter);
    }

    const results = await query;

    return results
        .map((row: any) => {
            const profit = row.totalWon - row.totalLost;
            const winPercentage = row.totalBets > 0 ? (row.wins / row.totalBets) * 100 : 0;
            return {
                id: row.id,
                fullName: row.fullName,
                country: row.country,
                totalBets: Number(row.totalBets),
                winPercentage: Number(winPercentage.toFixed(2)),
                profit: Number(profit.toFixed(2))
            };
        })
        .filter((row: any) => row.profit > 0)
        .sort((a: any, b: any) => b.profit - a.profit)
        .slice(0, 10);
}
