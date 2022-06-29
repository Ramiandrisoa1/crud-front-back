import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import userService from '../../service/user.service';
import { ShowContext } from '../userList/userList';

function FormAddEdit() {
  const value = useContext(ShowContext);

  const [user, setUser] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!value.data) {
      userService.addUser(user).then(
        (res) => {
          console.log('add res', res);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      userService.editUser(value.data._id, user).then(
        (res) => {
          console.log('edit res', res);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Nom</Form.Label>
        <Form.Control
          type='text'
          placeholder='Entrer Nom'
          name='name'
          value={user.name || ''}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicText'>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='email'
          placeholder='Entrer Email'
          name='email'
          value={user.email || ''}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicPoste'>
        <Form.Label>Poste</Form.Label>
        <Form.Control
          type='text'
          placeholder='Entrer Poste'
          name='poste'
          value={user.poste || ''}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        save
      </Button>
    </Form>
  );
}

export default FormAddEdit;
