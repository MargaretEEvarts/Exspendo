import React from 'react';

const Mainpage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-4xl font-bold mb-8 flex items-center">
      <span className="text-gray-800 mr-4">Welcome to </span>
        <img src="/logo.png" alt="Logo" className="mx-1 h-12" />
        <span className="text-gray-800">xspendo</span>
      </h2>
      <p className="text-lg mb-4">
        Manage your expenses, track your savings, and achieve your financial goals.
      </p>
    </div>
  );
}

export default Mainpage;
