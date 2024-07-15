import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/login/Login'
import Logout from './components/login/Logout'
// import CreatePost from './components/CreatePost'
import Navbar from './components/Navbar'
import QuestionPage from './components/QuestionPage'

import { useState } from 'react';
import CreateCategory from './components/CreateCategory';
import CreateQuestion from './components/CreateQuestion';
import SubcategoryPage from './components/SubcategoryPage';


function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))
  return (
    <Router>
      <Navbar isAuth={isAuth}/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* <Route path="/createpost" element={<CreatePost isAuth={isAuth}/>}></Route> */}
        <Route path="/createcategory" element={<CreateCategory isAuth={isAuth}/>}></Route>
        {/* <Route path="/createquestion" element={<CreateQuestion isAuth={isAuth} subcategory_id={subcategory_id}/>}></Route> */}
        <Route path="/createquestion" element={<CreateQuestion isAuth={isAuth}/>}></Route>
        <Route path="/login" element={<Login setIsAuth={setIsAuth}/>}></Route>
        <Route path="/logout" element={<Logout setIsAuth={setIsAuth}/>}></Route>
        <Route path="/subcategory/:subcategory_id" element={<SubcategoryPage setIsAuth={setIsAuth} />} />
        <Route path='/question' element={<QuestionPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
