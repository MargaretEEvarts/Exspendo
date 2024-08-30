import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './authorization/login';
import Signup from './authorization/signup';
import Mainpage from './mainpage';
import Home from './home';
import { AuthProvider, useAuth } from './authorization/authcontext';
import { Button } from "./@/components/ui/moving-border";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <AuthProvider>
      <Router>
        <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
          <Header />
          <main className="flex-grow bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
            <Routes>
              <Route path="/" element={<Mainpage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </main>
          <div className="fixed bottom-4 left-4">
            <button onClick={toggleDarkMode} className="p-2 rounded-full bg-white dark:bg-gray-700 text-black dark:text-white">
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m8-8h-1M5 12H4m13.657 5.657l-.707-.707M6.343 6.343l-.707-.707m12.02 0l-.707.707M6.343 17.657l-.707.707" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3a9 9 0 00-9 9 9 9 0 009 9 9 9 0 000-18zm0 2a7 7 0 017 7 7 7 0 01-7 7 7 7 0 010-14z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="flex justify-between items-center p-4 bg-green-900 text-white">
      <Link to="/">
        <Button borderRadius="1.75rem" className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-500 dark:border-slate-800 text-xl font-bold italic">
          Exspendo
        </Button>
      </Link>
      <nav>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="hover:underline">Logout</button>
        ) : (
          <>
            <Link to="/login" className="mr-4 hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default App;
