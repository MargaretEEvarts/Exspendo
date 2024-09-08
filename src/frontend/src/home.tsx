import React, { useState, useCallback, useEffect } from 'react';
import { useAuth } from './authorization/authcontext';

interface Expense {
  id: number;
  description: string;
  amount: number;
  date: string;
}

const Home: React.FC = () => {
  const { userId } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<number | ''>('');
  const [date, setDate] = useState<string>('');

  const fetchExpenses = useCallback(async () => {
    if (userId) {
      const response = await fetch(`http://localhost:5000/api/expenses?user_id=${userId}`);
      const data = await response.json();
      setExpenses(data.expenses);
    }
  }, [userId]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleAddExpense = async () => {
    if (description && amount && date) {
      const response = await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, description, amount, date }),
      });

      const data = await response.json();
      if (data.success) {
        fetchExpenses();
        setDescription('');
        setAmount('');
        setDate('');
      }
    }
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="flex flex-col items-center p-32 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="w-full max-w-md p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Add New Expense</h2>
        <input
          type="text"
          placeholder="Description"
          className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-gray-300"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-gray-300"
          value={amount}
          onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
        />
        <input
          type="date"
          className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-gray-300"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          onClick={handleAddExpense}
          className="w-full bg-green-700 dark:bg-green-800 text-white py-2 rounded-lg shadow-md hover:bg-green-800 dark:hover:bg-green-900 transition duration-300"
        >
          Add Expense
        </button>
      </div>

      <div className="w-full max-w-md p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Your Expenses</h2>
        <ul className="space-y-4">
          {expenses.map((expense) => (
            <li key={expense.id} className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">{expense.description}</span>
              <span className="text-gray-700 dark:text-gray-300">${expense.amount.toFixed(2)}</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">{expense.date}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-xl font-bold text-gray-800 dark:text-gray-200">
          Total: ${totalExpenses.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Home;
