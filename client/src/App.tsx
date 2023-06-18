import Navbar from './layouts/NavbarAndFooter/Navbar';
import './App.css';
import Footer from './layouts/NavbarAndFooter/Footer';
import HomePage from './layouts/HomePage/HomePage';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import BookCheckoutPage from './layouts/BookCheckoutPage/BookCheckoutPage';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { oktaConfig } from './lib/oktaConfig';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';

const oktaAuth = new OktaAuth(oktaConfig);

function App() {
  const navigate = useNavigate();

  const customAuthHandler = () => {
    navigate('/');
  };

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={restoreOriginalUri}
        onAuthRequired={customAuthHandler}
      >
        <Navbar />
        <div className='flex-grow-1'>
          <Routes>
            <Route path='/' index element={<HomePage />} />
            <Route path='/search' element={<SearchBooksPage />} />
            <Route path='/checkout/:bookId' element={<BookCheckoutPage />} />
            <Route
              path='/login'
              element={<LoginWidget config={oktaConfig} />}
            />
            <Route
              path='/login'
              element={<LoginWidget config={oktaConfig} />}
            />
            <Route path='/login/callback' element={<LoginCallback />} />
          </Routes>
        </div>
        <Footer />
      </Security>
    </div>
  );
}

export default App;
