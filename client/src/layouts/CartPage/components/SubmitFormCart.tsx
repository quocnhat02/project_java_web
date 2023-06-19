import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

interface FormData {
  name: string;
  email: string;
  location: string;
}

const SubmitFormCart = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    location: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(formData);
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

      <Form.Group controlId='formEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type='email'
          name='email'
          placeholder='Enter email'
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId='formLocation'>
        <Form.Label>Location</Form.Label>
        <Form.Control
          type='text'
          name='location'
          placeholder='Enter your location'
          value={formData.location}
          onChange={handleChange}
        />
      </Form.Group>

      <Button
        style={{
          marginTop: '10px',
          width: '100%',
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
