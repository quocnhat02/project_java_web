import Navbar from './layouts/NavbarAndFooter/Navbar';
import './App.css';
import Footer from './layouts/NavbarAndFooter/Footer';
import HomePage from './layouts/HomePage/HomePage';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import BookCheckoutPage from './layouts/BookCheckoutPage/BookCheckoutPage';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { oktaConfig } from './lib/oktaConfig';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';
import ShelfPage from './layouts/ShelfPage/ShelfPage';
import MessagesPage from './layouts/MessagesPage/MessagesPage';
import ManageLibraryPage from './layouts/ManageLibraryPage/ManageLibraryPage';
import CartPage from './layouts/CartPage/CartPage';

const oktaAuth = new OktaAuth(oktaConfig);

function App() {
  const customAuthHandler = () => {
    history.push('/login');
  };

  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={restoreOriginalUri}
        onAuthRequired={customAuthHandler}
      >
        <Navbar />
        <div
          className='flex-grow-1'
          style={{
            backgroundColor: '#F8EDE3',
          }}
        >
          <Switch>
            <Route path='/' exact>
              <Redirect to='/home' />
            </Route>
            <Route path='/home'>
              <HomePage />
            </Route>
            <Route path='/search'>
              <SearchBooksPage />
            </Route>
            <Route path='/checkout/:bookId'>
              <BookCheckoutPage />
            </Route>
            <Route
              path='/login'
              render={() => <LoginWidget config={oktaConfig} />}
            />
            <Route path='/login/callback' component={LoginCallback} />
            <SecureRoute path='/shelf'>
              <ShelfPage />
            </SecureRoute>
            <SecureRoute path='/messages'>
              <MessagesPage />
            </SecureRoute>
            <SecureRoute path='/admin'>
              <ManageLibraryPage />
            </SecureRoute>
            <SecureRoute path='/cart'>
              <CartPage />
            </SecureRoute>
          </Switch>
        </div>
        <Footer />
      </Security>
    </div>
  );
}

export default App;
