import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import Mainpage from './mainpage';
import Home from './home';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
          <h1 className="text-2xl">Exspendo</h1>
          <nav>
            <Link to="/login" className="mr-4 hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
          </nav>
        </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />}></Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
