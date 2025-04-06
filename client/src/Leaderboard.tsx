// client/src/Leaderboard.tsx
import React, { useState, useEffect } from 'react';

interface LeaderboardItem {
    id: string;
    fullName: string;
    country: string;
    totalBets: number;
    winPercentage: number;
    profit: number;
}

const Leaderboard: React.FC = () => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
    const [country, setCountry] = useState<string>('ALL');

    const fetchLeaderboard = async (selectedCountry: string) => {
        console.log("Fetching leaderboard for:", selectedCountry);
        try {
            const response = await fetch(`/leaderboard?country=${selectedCountry}`, { cache: 'no-store' });
            console.log(response)
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const data: LeaderboardItem[] = await response.json();
            console.log("Received data:", data);
            setLeaderboard(data);
        } catch (err) {
            console.error('Error fetching leaderboard:', err);
        }
    };

    useEffect(() => {
        fetchLeaderboard(country);
    }, [country]);

    return (
        <div>
            <h2>Betting Leaderboard</h2>
            <div>
                <label htmlFor="country-filter">Filter by country:</label>
                <select
                    id="country-filter"
                    value={country}
                    onChange={(e) => {
                        console.log("Selected country:", e.target.value);
                        setCountry(e.target.value)
                    }
                    }
                >
                    <option value="ALL">ALL</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Finland">Finland</option>
                    <option value="Norway">Norway</option>
                    <option value="Chile">Chile</option>
                    <option value="Canada">Canada</option>
                    {/* Add more options as needed */}
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
