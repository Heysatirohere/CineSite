import React, { useState } from 'react'; 
import HomePage from './Pages/HomePage.jsx';
import DetailsPage from './Pages/DetailsPage.jsx';
import Header from './Components/Header.jsx';
import Footer from './Components/Footer.jsx';
import { Routes, Route } from 'react-router-dom';

function App() {
  //O estado da busca 
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Header onSearch={setSearchTerm} />
      <Routes>
        <Route 
          path="/" 
          element={<HomePage searchTerm={searchTerm} />} 
        />
        <Route path="/movie/:id" element={<DetailsPage />} />
      </Routes>
    <Footer />
    </>
  )
}

export default App;