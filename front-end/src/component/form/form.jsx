import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import userService from '../../service/user.service';
import { ShowContext } from '../userList/userList';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './form.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

function FormAddEdit() {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('ce champ est obligatoire')
      .min(5, 'trop petit!')
      .max(50, 'trop long!'),
    email: Yup.string()
      .email('email invalide')
      .required("l'email est obligatoire"),
    poste: Yup.string()
      .required('ce champ est obligatoire')
      .min(5, 'trop petit!')
      .max(50, 'trop long!'),
  });

  const { register, formState, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { errors } = formState;

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

  function handleSubmitAddEdit(event) {
    if (!value.dataEdit) {
      userService.addUser(user).then(
        (res) => {
          console.log(res);
          const addData = {
            _id: res.data.user._id,
            name: res.data.user.name,
            email: res.data.user.email,
            poste: res.data.user.poste,
          };
          value.setUser([...value.users, addData]);
          toast.success('ajout avec succès', { autoClose: 1000 });
          value.handleClose();
        },
        (err) => {
          console.log(err);
          toast.error('erreur', { autoClose: 1000 });
        }
      );
    } else {
      userService.editUser(value.dataEdit._id, user).then(
        (res) => {
          console.log(res);
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
          toast.success('Modification avec succès', { autoClose: 1000 });
          value.handleClose();
        },
        (err) => {
          console.log(err);
          toast.error('erreur', { autoClose: 1000 });
        }
      );
    }
  }
  return (
    <>
      <Form id='form-add-edit' onSubmit={handleSubmit(handleSubmitAddEdit)}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Nom</Form.Label>
          <Form.Control
            className='form-ctrl'
            type='text'
            placeholder='Entrer Nom'
            name='name'
            value={user.name}
            {...register('name')}
            onChange={handleChange}
          />
          <small className='text-danger'>{errors.name?.message}</small>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicText'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            className='form-ctrl'
            type='email'
            placeholder='Entrer Email'
            name='email'
            value={user.email}
            {...register('email')}
            onChange={handleChange}
          />
          <small className='text-danger'>{errors.email?.message}</small>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPoste'>
          <Form.Label>Poste</Form.Label>
          <Form.Control
            className='form-ctrl'
            type='text'
            placeholder='Entrer Poste'
            name='poste'
            value={user.poste}
            {...register('poste')}
            onChange={handleChange}
          />
          <small className='text-danger'>{errors.poste?.message}</small>
        </Form.Group>
      </Form>
    </>
  );
}

export default FormAddEdit;
