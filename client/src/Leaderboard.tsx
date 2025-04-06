import React, { useState, useEffect } from 'react';

interface LeaderboardItem {
    id: number;
    fullName: string;
    country: string;
    totalBets: number;
    winPercentage: number;
    profit: number;
}

const Leaderboard: React.FC = () => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
    const [country, setCountry] = useState<string>('ALL');

    const fetchLeaderboard = async () => {
        try {
            const res = await fetch('http://localhost:3000/leaderboard', { method: 'GET' })
            setLeaderboard(await res.json());
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
    }, [country]);

    return (
        <div>
            <h2>Betting Leaderboard</h2>
            <div>
                <label htmlFor="country-filter">Filter by country:</label>
                <select
                    id="country-filter"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                >
                    <option value="ALL">ALL</option>
                    {/* Add more country options as needed */}
                    <option value="Estonia">Estonia</option>
                    <option value="USA">USA</option>
                </select>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Country</th>
                    <th>Total Bets</th>
                    <th>Win Percentage</th>
                    <th>Profit</th>
                </tr>
                </thead>
                <tbody>
                {leaderboard.map((item) => (
                    <tr key={item.id}>
                        <td>{item.fullName}</td>
                        <td>{item.country}</td>
                        <td>{item.totalBets}</td>
                        <td>{item.winPercentage}%</td>
                        <td>{item.profit} €</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
