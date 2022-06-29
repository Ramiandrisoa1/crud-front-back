import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ShowContext } from '../userList/userList';

function Modals() {
  const value = useContext(ShowContext);
  return (
    <>
      <Modal show={value.show} onHide={value.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
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
