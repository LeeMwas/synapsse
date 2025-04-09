import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './components/Home.jsx';
import { Blog } from './sections/Blog';
import { SynapseSpinner } from './components/SynapseSpinner';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return <SynapseSpinner />;
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={
              <ErrorBoundary>
                <Blog />
              </ErrorBoundary>
            } />
          </Routes>
        </ErrorBoundary>
      </Router>
    </div>
  );
}