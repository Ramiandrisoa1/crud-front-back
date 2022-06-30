import React, { useContext, forwardRef, useImperativeHandle } from 'react';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import userService from '../../service/user.service';
import { ShowContext } from '../userList/userList';

const FormAddEdit = forwardRef((props, ref) => {
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

  useImperativeHandle(ref, () => ({
    handleSubmit(event) {
      event.preventDefault();
      if (!valueData.dataEdit) {
        userService.addUser(user).then(
          (res) => {
            console.log('add res', res);
            valueData.handleClose();
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        userService.editUser(valueData.dataEdit._id, user).then(
          (res) => {
            console.log('edit res', res);
            valueData.handleClose();
          },
          (err) => {
            console.log(err);
          }
        );
      }
    },
  }));

  return (
    <Form>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Nom</Form.Label>
        <Form.Control
          type='text'
          placeholder='Entrer Nom'
          name='name'
          value={user.name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicText'>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='email'
          placeholder='Entrer Email'
          name='email'
          value={user.email}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicPoste'>
        <Form.Label>Poste</Form.Label>
        <Form.Control
          type='text'
          placeholder='Entrer Poste'
          name='poste'
          value={user.poste}
          onChange={handleChange}
        />
      </Form.Group>
    </Form>
  );
});

export default FormAddEdit;
