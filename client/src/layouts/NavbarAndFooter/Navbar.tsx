import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import SpinnerLoading from '../Utils/SpinnerLoading';
import { useSelector, useDispatch } from 'react-redux';
import { CartsState } from '../../reducer/cartsReducer';

const Navbar = () => {
  const { oktaAuth, authState } = useOktaAuth();
  // const [numberCart, setNumberCart] = useState(
  //   sessionStorage.getItem('myCart')?.length || 0
  // );

  const numCart = useSelector<CartsState>((state) => state.numCarts) as any;
  const dispatch = useDispatch();

  useEffect(() => {
    // setNumberCart(
    //   JSON.parse(sessionStorage.getItem('myCart') as any).length || 0
    // );

    dispatch({
      type: 'UPDATE_CART',
      payload: {
        numCarts:
          (JSON.parse(sessionStorage.getItem('myCart') as any)
            ?.length as number) || 0,
      },
    });
  }, [numCart.numCarts]);

  if (!authState) {
    return <SpinnerLoading />;
  }

  const handleLogout = async () => {
    sessionStorage.clear();

    oktaAuth.signOut();
  };

  console.log(authState);

  return (
    <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
      <div className='container-fluid'>
        <span className='navbar-brand'>Book Shop</span>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle Navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/'>
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/search'>
                Search Books
              </NavLink>
            </li>
            {authState.isAuthenticated && (
              <li className='nav-item'>
                <NavLink className='nav-link' to='/shelf'>
                  Shelf
                </NavLink>
              </li>
            )}
            {authState.isAuthenticated &&
              authState.accessToken?.claims?.userType === 'admin' && (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='/admin'>
                    Admin
                  </NavLink>
                </li>
              )}
            {authState.isAuthenticated &&
              authState.accessToken?.claims?.userType === undefined && (
                <li
                  className='nav-item'
                  style={{
                    position: 'relative',
                  }}
                >
                  <NavLink className='nav-link' to='/cart'>
                    <div
                      style={{
                        alignSelf: 'center',
                        lineHeight: '100%',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          background: 'white',
                          padding: '2px 6px',
                          borderRadius: '50%',
                          top: 0,
                          right: -12,
                        }}
                      >
                        {numCart.numCarts || 0}
                      </span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width={20}
                        height={20}
                        fill='currentColor'
                        className='bi bi-cart3'
                        viewBox='0 0 16 16'
                      >
                        <path d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' />
                      </svg>
                    </div>
                  </NavLink>
                </li>
              )}
          </ul>
          <ul className='navbar-nav ms-auto'>
            {!authState.isAuthenticated ? (
              <li className='nav-item m-1'>
                <Link
                  type='button'
                  className='btn btn-outline-light'
                  to='/login'
                >
                  Sign in
                </Link>
              </li>
            ) : (
              <li>
                <button
                  className='btn btn-outline-light'
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
