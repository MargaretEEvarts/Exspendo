import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-4xl font-bold mb-8">Welcome to the Expense Tracker</h2>
      <p className="text-lg mb-4">
        Manage your expenses, track your savings, and achieve your financial goals.
      </p>
    </div>
  );
}

export default Home;
