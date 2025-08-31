import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProblemListPage = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get('/api/problems');
        setProblems(res.data);
      } catch (err) {
        console.error("Error fetching problems:", err);
        setError("Failed to fetch problems. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-xl">Loading problems...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-500 text-xl">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Problem List</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <div key={problem._id} className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 hover:border-indigo-500 transition-colors">
              <h2 className="text-2xl font-semibold mb-2">{problem.title}</h2>
              <p className={`text-sm font-bold ${problem.difficulty === 'Easy' ? 'text-green-500' : problem.difficulty === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>{problem.difficulty}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {problem.tags.map(tag => (
                  <span key={tag} className="bg-gray-700 text-gray-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
              <Link to={`/problems/${problem._id}`} className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors">
                Solve Problem
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemListPage;
