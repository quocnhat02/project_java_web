import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { CartsState } from '../../../reducer/cartsReducer';
import { useOktaAuth } from '@okta/okta-react';
import AddOrderModel from '../../../models/AddOrderModel';
import { useHistory } from 'react-router-dom';

interface FormData {
  name: string;
  phoneNumber: string;
  address: string;
}

const SubmitFormCart = () => {
  const numCart = useSelector<CartsState>((state) => state.numCarts) as any;
  const { authState } = useOktaAuth();
  const dispatch = useDispatch();
  const history = useHistory();

  // Displays
  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phoneNumber: '',
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

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    let listBookId = getListBookId();

    const url = `http://localhost:8080/api/orders/secure/add/order`;
    if (
      authState?.isAuthenticated &&
      formData.name !== '' &&
      formData.phoneNumber !== '' &&
      formData.address !== '' &&
      numCart?.numCarts > 0
    ) {
      const book: AddOrderModel = new AddOrderModel(
        authState?.idToken?.claims?.email || '',
        formData.name,
        formData.phoneNumber,
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
        phoneNumber: '',
        address: '',
      });
      sessionStorage.clear();
      dispatch({
        type: 'UPDATE_CART',
        payload: {
          numCarts: 0,
        },
      });
      setDisplayWarning(false);
      setDisplaySuccess(true);
      history.push('/');
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
          type='phoneNumber'
          name='phoneNumber'
          placeholder='Enter phoneNumber'
          value={formData.phoneNumber}
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
            formData.phoneNumber !== ''
              ? 'blue'
              : '#555',
          pointerEvents:
            numCart?.numCarts &&
            formData.name !== '' &&
            formData.address !== '' &&
            formData.phoneNumber !== ''
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
