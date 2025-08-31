import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get('/api/leaderboard');
        setLeaderboard(res.data);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        setError("Failed to fetch leaderboard. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-xl">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-500 text-xl">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">🏆 Leaderboard</h1>
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2 text-left">Rank</th>
                <th className="px-4 py-2 text-left">Username</th>
                <th className="px-4 py-2 text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, index) => (
                <tr key={user._id} className="border-t border-gray-700 hover:bg-gray-700">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2 text-right">{user.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
