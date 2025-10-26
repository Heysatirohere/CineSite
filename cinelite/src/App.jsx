import React, { useState } from 'react';
import HomePage from './Pages/HomePage.jsx';
import DetailsPage from './Pages/DetailsPage.jsx';
import Header from './Components/Header.jsx';
import Footer from './Components/Footer.jsx';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  return (
    <>
      <Header onSearch={setSearchTerm} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route 
            path="/" 
            element={<HomePage searchTerm={searchTerm} />} 
          />
          <Route 
            path="/movie/:id" 
            element={<DetailsPage />} 
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;