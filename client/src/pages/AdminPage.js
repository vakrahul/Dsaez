import React, { useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'Easy',
    points: 10,
    tags: '',
    testCases: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Adding problem...');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('You must be logged in as an admin to add a problem.');
        return;
      }

      const problemData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        testCases: JSON.parse(formData.testCases)
      };

      await axios.post(
        '/api/problems', 
        problemData,
        { headers: { 'x-auth-token': token } }
      );
      
      setMessage('Problem added successfully!');
      setFormData({
        title: '',
        description: '',
        difficulty: 'Easy',
        points: 10,
        tags: '',
        testCases: ''
      });
    } catch (err) {
      setMessage('Failed to add problem. You may not have admin privileges.');
      console.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
          <h1 className="text-3xl font-bold mb-6 text-center">Add New Problem</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-gray-400 font-bold mb-2">Title</label>
              <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="w-full bg-gray-700 p-3 rounded" />
            </div>
            <div>
              <label htmlFor="description" className="block text-gray-400 font-bold mb-2">Description</label>
              <textarea name="description" id="description" value={formData.description} onChange={handleChange} required rows="6" className="w-full bg-gray-700 p-3 rounded"></textarea>
            </div>
            <div>
              <label htmlFor="difficulty" className="block text-gray-400 font-bold mb-2">Difficulty</label>
              <select name="difficulty" id="difficulty" value={formData.difficulty} onChange={handleChange} className="w-full bg-gray-700 p-3 rounded">
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
            <div>
              <label htmlFor="points" className="block text-gray-400 font-bold mb-2">Points</label>
              <input type="number" name="points" id="points" value={formData.points} onChange={handleChange} required className="w-full bg-gray-700 p-3 rounded" />
            </div>
            <div>
              <label htmlFor="tags" className="block text-gray-400 font-bold mb-2">Tags (comma-separated)</label>
              <input type="text" name="tags" id="tags" value={formData.tags} onChange={handleChange} required className="w-full bg-gray-700 p-3 rounded" />
            </div>
            <div>
              <label htmlFor="testCases" className="block text-gray-400 font-bold mb-2">Test Cases (JSON array)</label>
              <textarea name="testCases" id="testCases" value={formData.testCases} onChange={handleChange} required rows="4" className="w-full bg-gray-700 p-3 rounded"></textarea>
              <p className="text-sm text-gray-500 mt-2">Example: [{'{"input": "2,7,11,15", "output": "0,1"}'}]</p>
            </div>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition-colors">
              Add Problem
            </button>
            {message && <p className="mt-4 text-center text-sm">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
