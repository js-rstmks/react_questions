import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/login/Login';
import Logout from './components/login/Logout';
import Navbar from './components/Navbar';
import QuestionPage from './components/QuestionPage';
import CreateCategory from './components/CreateCategory';
import CreateQuestion from './components/CreateQuestion';
import SubcategoryPage from './components/SubcategoryPage';

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(!!localStorage.getItem("isAuth"));

  return (
    <Router>
      <Navbar isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createcategory" element={<CreateCategory isAuth={isAuth} />} />
        {/* <Route path="/createquestion" element={<CreateQuestion isAuth={isAuth} />} /> */}
        <Route path="/createquestion" element={<CreateQuestion />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/logout" element={<Logout setIsAuth={setIsAuth} />} />
        <Route path="/subcategory/:subcategory_id" element={<SubcategoryPage />} />
        <Route path="/question" element={<QuestionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
