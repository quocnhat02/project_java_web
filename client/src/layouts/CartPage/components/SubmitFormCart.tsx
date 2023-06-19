import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { CartsState } from '../../../reducer/cartsReducer';
import { useOktaAuth } from '@okta/okta-react';
import AddOrderModel from '../../../models/AddOrderModel';

interface FormData {
  name: string;
  phone: string;
  address: string;
}

const SubmitFormCart = () => {
  const numCart = useSelector<CartsState>((state) => state.numCarts) as any;
  const { authState } = useOktaAuth();
  const dispatch = useDispatch();

  // Displays
  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getListBookId = () => {
    const c = sessionStorage.getItem('myCart') as any;
    let obj = JSON.parse(c);

    let listBookId = [];
    for (let i = 0; i < obj.length; i++) {
      listBookId.push(obj[i]?.id);
    }

    return listBookId;

    // dispatch({
    //   type: 'UPDATE_CART',
    //   payload: {
    //     numCarts: 0,
    //   },
    // });
  };

  console.log(authState?.idToken?.claims?.email);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    let listBookId = getListBookId();

    const url = `http://localhost:8080/api/admin/secure/add/order`;
    if (
      authState?.isAuthenticated &&
      formData.name !== '' &&
      formData.phone !== '' &&
      formData.address !== '' &&
      numCart?.numCarts > 0
    ) {
      const book: AddOrderModel = new AddOrderModel(
        authState?.idToken?.claims?.email || '',
        formData.name,
        formData.phone,
        formData.address,
        listBookId
      );
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      };

      const submitNewBookResponse = await fetch(url, requestOptions);
      if (!submitNewBookResponse.ok) {
        throw new Error('Something went wrong!');
      }
      setFormData({
        name: '',
        phone: '',
        address: '',
      });
      dispatch({
        type: 'UPDATE_CART',
        payload: {
          numCarts: 0,
        },
      });
      setDisplayWarning(false);
      setDisplaySuccess(true);
    } else {
      setDisplayWarning(true);
      setDisplaySuccess(false);
    }
  };

  return (
    <Form>
      <Form.Group controlId='formName'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='text'
          name='name'
          placeholder='Enter your name'
          value={formData.name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId='formPhone'>
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type='phone'
          name='phone'
          placeholder='Enter phone'
          value={formData.phone}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId='formAddress'>
        <Form.Label>Address</Form.Label>
        <Form.Control
          type='text'
          name='address'
          placeholder='Enter your address'
          value={formData.address}
          onChange={handleChange}
        />
      </Form.Group>

      <Button
        style={{
          marginTop: '10px',
          width: '100%',
          background:
            numCart?.numCarts &&
            formData.name !== '' &&
            formData.address !== '' &&
            formData.phone !== ''
              ? 'blue'
              : '#555',
          pointerEvents:
            numCart?.numCarts &&
            formData.name !== '' &&
            formData.address !== '' &&
            formData.phone !== ''
              ? 'auto'
              : 'none',
        }}
        variant='primary'
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <hr />
    </Form>
  );
};

export default SubmitFormCart;
