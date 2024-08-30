import React, { useState } from 'react';

const Mainpage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f7f0] dark:bg-gray-900">
      <h2 className="text-4xl font-bold mb-8 flex items-center">
        <span className="text-black dark:text-gray-200 mr-4">Welcome to</span>
        <img 
          src={isDarkMode ? "/inverted_logo.png" : "/logo.png"} 
          alt="Logo" 
          className="mx-1 h-12"
        />
        <span className="text-black dark:text-gray-200">xspendo</span>
      </h2>
      <p className="text-lg mb-4 text-black dark:text-gray-300">
        Manage your expenses, track your savings, and achieve your financial goals.
      </p>
      <div className="fixed bottom-4 left-4">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)} 
          className="p-2 rounded-full bg-white dark:bg-gray-700 text-black dark:text-white"
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3a9 9 0 00-9 9 9 9 0 009 9 9 9 0 000-18zm0 2a7 7 0 017 7 7 7 0 01-7 7 7 7 0 010-14z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m8-8h-1M5 12H4m13.657 5.657l-.707-.707M6.343 6.343l-.707-.707m12.02 0l-.707.707M6.343 17.657l-.707.707" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default Mainpage;
