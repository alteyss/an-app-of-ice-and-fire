import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import BooksDetails from './components/BooksDetails/BooksDetails';
import BooksListing from './components/BooksListing/BooksListing';

function App() {
  return (
    <Routes>
      <Route path="/" element={<BooksListing />} />
      <Route path=":bookId" element={<BooksDetails />} />
    </Routes>
  );
}

export default App;
