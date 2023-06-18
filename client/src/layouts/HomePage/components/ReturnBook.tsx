/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import BookModel from '../../../models/BookModel';
import { Link, NavLink } from 'react-router-dom';

const ReturnBook: React.FC<{ book: BookModel }> = (props) => {
  return (
    <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
      <div
        className='text-center'
        style={{
          height: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {props.book.img ? (
          <img src={props.book.img} alt='book' width={'151'} height={'233'} />
        ) : (
          <img
            src={require('./../../../Images/BooksImages/book-luv2code-1000.png')}
            alt='book'
            width={'151'}
            height={'233'}
          />
        )}
        <h6 className='mt-2'>{props.book?.title}</h6>
        <p>{props.book?.author}</p>
        <Link
          to={`/checkout/${props.book?.id}`}
          className='btn main-color text-white'
        >
          Reserve
        </Link>
      </div>
    </div>
  );
};

export default ReturnBook;
