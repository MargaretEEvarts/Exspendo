import React from 'react';

const Mainpage: React.FC = () => {
  const isDarkMode = document.documentElement.classList.contains('dark');

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
    </div>
  );
}

export default Mainpage;
