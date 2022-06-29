import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ShowContext } from '../userList/userList';
import FormAddEdit from '../form/form';

function Modals() {
  const value = useContext(ShowContext);
  return (
    <>
      <Modal show={value.show} onHide={value.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormAddEdit />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={value.handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={value.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modals;
