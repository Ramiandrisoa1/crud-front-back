import React from 'react';
import { Form } from 'react-bootstrap';

function FormAddEdit() {
  return (
    <Form>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Nom</Form.Label>
        <Form.Control type='text' placeholder='Entrer Nom' />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicText'>
        <Form.Label>Email</Form.Label>
        <Form.Control type='email' placeholder='Entrer Email' />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicPoste'>
        <Form.Label>Poste</Form.Label>
        <Form.Control type='text' placeholder='Entrer Poste' />
      </Form.Group>
    </Form>
  );
}

export default FormAddEdit;
