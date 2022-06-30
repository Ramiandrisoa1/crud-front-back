import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import userService from '../../service/user.service';
import { ShowContext } from '../userList/userList';

function FormAddEdit() {
  const valueData = useContext(ShowContext);

  const initialState = {
    name: valueData.dataEdit ? valueData.dataEdit.name : '',
    email: valueData.dataEdit ? valueData.dataEdit.email : '',
    poste: valueData.dataEdit ? valueData.dataEdit.poste : '',
  };

  const [user, setUser] = useState(initialState);

  const handleChange = ({ target: { value, name } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!valueData.dataEdit) {
      userService.addUser(user).then(
        (res) => {
          console.log('add res', res);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      userService.editUser(valueData.dataEdit._id, user).then(
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
