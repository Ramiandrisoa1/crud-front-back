import React, {
  useContext,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { Form } from 'react-bootstrap';
import userService from '../../service/user.service';
import { ShowContext } from '../userList/userList';

const FormAddEdit = forwardRef((props, ref) => {
  const value = useContext(ShowContext);

  const initialState = {
    name: value.dataEdit ? value.dataEdit.name : '',
    email: value.dataEdit ? value.dataEdit.email : '',
    poste: value.dataEdit ? value.dataEdit.poste : '',
  };

  const [user, setUser] = useState(initialState);

  const handleChange = ({ target: { value, name } }) => {
    setUser({ ...user, [name]: value });
  };

  useImperativeHandle(ref, () => ({
    handleSubmit(event) {
      event.preventDefault();
      if (!value.dataEdit) {
        userService.addUser(user).then(
          (res) => {
            console.log(res);
            value.handleClose();
            const addData = {
              _id: res.data.user._id,
              name: res.data.user.name,
              email: res.data.user.email,
              poste: res.data.user.poste,
            };
            value.setUser([...value.users, addData]);
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        userService.editUser(value.dataEdit._id, user).then(
          (res) => {
            console.log(res);
            value.handleClose();
            const editData = {
              _id: value.dataEdit._id,
              name: user.name,
              email: user.email,
              poste: user.poste,
            };
            value.setUser(
              value.users.map((users) => {
                return users._id === value.dataEdit._id ? editData : users;
              })
            );
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
