import Navbar from './layouts/NavbarAndFooter/Navbar';
import './App.css';
import Footer from './layouts/NavbarAndFooter/Footer';
import HomePage from './layouts/HomePage/HomePage';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';
import { Route, Routes } from 'react-router-dom';
import BookCheckoutPage from './layouts/BookCheckoutPage/BookCheckoutPage';

function App() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <div className='flex-grow-1'>
        <Routes>
          <Route path='/' index element={<HomePage />} />
          <Route path='/search' element={<SearchBooksPage />} />
          <Route path='/checkout/:bookId' element={<BookCheckoutPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
