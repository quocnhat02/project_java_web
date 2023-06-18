import { Link, NavLink } from 'react-router-dom';
import SpinnerLoading from '../Utils/SpinnerLoading';

const Navbar = () => {
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
          </ul>
          <ul className='navbar-nav ms-auto'>
            <a href='#' type='button' className='btn btn-outline-light'>
              Sign In
            </a>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
