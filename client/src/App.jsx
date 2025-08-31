import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import './index.css';

import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ProblemListPage from './pages/ProblemListPage.jsx';
import ProblemPage from './pages/ProblemPage.jsx';
import LeaderboardPage from './pages/LeaderboardPage.jsx';
import AdminPage from './pages/AdminPage.jsx';

// A more advanced 3D component with dynamic effects
const AnimatedScene = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Create a subtle breathing/scaling animation
      const time = state.clock.getElapsedTime();
      meshRef.current.scale.x = meshRef.current.scale.y = meshRef.current.scale.z = 1 + Math.sin(time) * 0.1;

      // Make the box rotate
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#34d399" emissive="#1f2937" emissiveIntensity={0.5} />
    </mesh>
  );
};

const ThreeJSScene = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10">
      <Canvas camera={{ position: [5, 5, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#f97316" />
        <AnimatedScene />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

const HomePage = () => (
  <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
    <ThreeJSScene />
    <div className="bg-gray-800 bg-opacity-70 p-8 rounded-lg shadow-xl text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-pulse">
        Welcome to your DSA Platform
      </h1>
      <p className="text-xl md:text-2xl font-semibold mb-6">
        Ready to solve some problems?
      </p>
      <div className="flex space-x-4">
        <Link to="/login" className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 transition-colors rounded-full font-bold shadow-lg">Login</Link>
        <Link to="/signup" className="px-6 py-3 bg-green-500 hover:bg-green-600 transition-colors rounded-full font-bold shadow-lg">Sign Up</Link>
      </div>
    </div>
  </div>
);

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-2xl">
          <Link to="/">DSA Platform</Link>
        </div>
        <div className="space-x-4">
          <Link to="/problems" className="text-gray-300 hover:text-white transition-colors">Problems</Link>
          <Link to="/leaderboard" className="text-gray-300 hover:text-white transition-colors">Leaderboard</Link>
          <Link to="/admin" className="text-gray-300 hover:text-white transition-colors">Admin</Link>
          <Link to="/login" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white font-semibold transition-colors">Login</Link>
        </div>
      </div>
    </nav>
  );
};

// Main React App with Routes
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/problems" element={<ProblemListPage />} />
        <Route path="/problems/:id" element={<ProblemPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default App;