import React, { useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import App from './App'
import Sidebar from './Sidebar'
import Home from './Pages/Home'
import Categories from './Pages/Categories'
import Profile from './Pages/Profile'
import Header from './Components/CommonElements/Header'
import Footer from './Components/CommonElements/Footer'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById('root'));

function Routing() {
  const MemoizedHeader = useMemo(() => <Header />, []);

  return (
    <Router>
      <Routes>
        <Route path="/home" element={ <> {MemoizedHeader} <Home /> </> } />
        <Route path="/categories" element={ <> {MemoizedHeader} <Categories /> </> } />
        <Route path="/profile" element={ <Profile />} />
        <Route path="/sidebar" element={ <> {MemoizedHeader} <Sidebar /> </>} />
        <Route index element={<App />} />
      </Routes>
    </Router>
  );
}

root.render(
  <>
    <Routing />
    <Footer />
  </>
    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
