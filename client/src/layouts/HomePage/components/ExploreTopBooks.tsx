/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';

const ExploreTopBooks = () => {
  return (
    <div className='p-5 mb-4 bg-dark header'>
      <div
        className='container-fluid py-5 text-white 
      d-flex justify-content-center align-items-center'
      >
        <div>
          <h1 className='display-5 fw-bold text-white'>
            Find your next adventure
          </h1>
          <p className='col-md-8 fs-4 text-white'>
            Where would you like to go next?
          </p>
          <Link
            to='/search'
            type='button'
            className='btn main-color btn-lg text-white'
          >
            Explore top books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExploreTopBooks;
