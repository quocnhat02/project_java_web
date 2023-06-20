import React, { useEffect, useState } from 'react';
import CartItem from './components/CartItem';
import SubmitFormCart from './components/SubmitFormCart';

const CartPage = () => {
  const [listBook, setListBook] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cartItems = sessionStorage.getItem('myCart');
    if (cartItems) {
      setListBook(JSON.parse(cartItems));
      let obj = JSON.parse(cartItems);
      let sum = 0;
      for (let i = 0; i < obj.length; i++) {
        sum += obj[i]?.price;
      }

      setTotal(sum);
    }
  }, [total]);

  return (
    <div
      style={{
        padding: '10px',
      }}
    >
      <h2>Shopping Cart</h2>
      <div
        style={{
          display: 'flex',
        }}
      >
        <div
          className='row'
          style={{
            flex: 3,
          }}
        >
          {listBook.map(
            ({ id, title, author, category, description, img, price }) => (
              <CartItem
                key={id}
                id={id}
                title={title}
                category={category}
                author={author}
                description={description}
                img={img}
                price={price}
                setTotal={setTotal}
              />
            )
          )}
        </div>
        <div
          style={{
            flex: 2,
            background: '#fff',
            padding: '10px',
            height: '350px',
          }}
        >
          <SubmitFormCart />
          <h2 className='text-secondary'>Total: ${total}</h2>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
