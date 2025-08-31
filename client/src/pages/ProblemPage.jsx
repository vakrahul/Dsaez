import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProblemPage = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [solution, setSolution] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await axios.get(`/api/problems/${id}`);
        setProblem(res.data);
      } catch (err) {
        console.error("Error fetching problem:", err);
        setError("Failed to fetch problem. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Submitting solution...');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('You must be logged in to submit a solution.');
        return;
      }
      const res = await axios.post(
        '/api/submissions', 
        { problemId: id, solution },
        { headers: { 'x-auth-token': token } }
      );
      setMessage(res.data.msg);
    } catch (err) {
      setMessage('Submission failed.');
      console.error(err.response ? err.response.data : err.message);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-xl">Loading problem...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-500 text-xl">{error}</div>;
  }

  if (!problem) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-xl">Problem not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="container mx-auto">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
          <h1 className="text-3xl font-bold mb-4">{problem.title}</h1>
          <p className={`text-sm font-bold mb-4 ${problem.difficulty === 'Easy' ? 'text-green-500' : problem.difficulty === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>
            Difficulty: {problem.difficulty}
          </p>
          <div className="prose text-gray-300">
            <p className="whitespace-pre-wrap">{problem.description}</p>
          </div>
          <h3 className="text-xl font-semibold mt-6 mb-2">Code Submission</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full h-48 bg-gray-700 text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Write your solution here..."
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
            />
            <button
              type="submit"
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Submit Solution
            </button>
          </form>
          {message && <p className="mt-4 text-center text-sm">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
