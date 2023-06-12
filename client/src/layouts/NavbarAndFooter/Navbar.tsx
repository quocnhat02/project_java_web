/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary'>
      <div className='container-fluid gap-2'>
        <a className='navbar-brand' href='#'>
          App Java
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <NavLink className='nav-link active' aria-current='page' to='/'>
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/search'>
                Search
              </NavLink>
            </li>
          </ul>
          {/* <form
            className='d-flex'
            role='search'
            style={{
              width: '400px',
            }}
          >
            <input
              className='form-control me-2'
              type='search'
              placeholder='Search'
              aria-label='Search'
            />
            <button className='btn btn-outline-success' type='submit'>
              Search
            </button>
          </form> */}
          <button
            className='btn btn-outline-success bg-info'
            style={{
              marginLeft: 'auto',
            }}
          >
            <a
              href='#'
              style={{
                textDecoration: 'none',
              }}
            >
              Sign in
            </a>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
