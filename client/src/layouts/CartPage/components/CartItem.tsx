/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Button } from 'react-bootstrap';

const CartItem: React.FC<{
  id: number;
  title: string;
  author: string;
  description: string;
  category: string;
  price: string;
  img: string;
  setTotal: any;
}> = ({ id, title, author, description, category, price, img, setTotal }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '2em',
        marginBottom: '2em',
        width: '500px',
      }}
    >
      <img
        style={{
          width: '200px',
          height: '300px',
        }}
        src={img}
      />

      <div
        style={{
          height: '100%',
        }}
      >
        <h3>
          {title} - {category}
        </h3>
        <h5 className='text-muted'>Price: ${price}</h5>
        <Button
          style={{
            marginTop: 'auto',
            width: '200px',
          }}
          variant='danger'
          onClick={() => {
            const cartItems = sessionStorage.getItem('myCart');
            if (cartItems) {
              let obj = JSON.parse(cartItems);

              obj = obj.filter((item: any) => item.id !== id);

              sessionStorage.setItem('myCart', JSON.stringify(obj));

              let sum = 0;
              for (let i = 0; i < obj.length; i++) {
                sum += obj[i]?.price;
              }

              setTotal(sum);
            }
          }}
        >
          Remove
        </Button>
        {/* <p>{description}</p> */}
      </div>
    </div>
  );
};

export default CartItem;
