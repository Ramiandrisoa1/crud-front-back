import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ShowContext } from '../userList/userList';
import FormAddEdit from '../form/form';
import userService from '../../service/user.service';

function Modals() {
  const value = useContext(ShowContext);

  const deleteUser = () => {
    // setUser(users.filter((user) => user._id !== id));
    userService.deleteUser(value.dataDelete._id);
  };

  return (
    <>
      <Modal show={value.show} onHide={value.handleClose}>
        {(() => {
          switch (value.status) {
            case 'delete':
              return (
                <>
                  <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Voulez‑vous vraiment supprimer cet utilisateur ?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant='secondary' onClick={value.handleClose}>
                      Close
                    </Button>
                    <Button variant='primary' onClick={deleteUser}>
                      Confirmer
                    </Button>
                  </Modal.Footer>
                </>
              );
            case 'edit':
              return (
                <>
                  <Modal.Header closeButton>
                    <Modal.Title>Modification</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <FormAddEdit />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant='secondary' onClick={value.handleClose}>
                      Close
                    </Button>
                    <Button variant='primary'>Modifier</Button>
                  </Modal.Footer>
                </>
              );
            case 'add':
              return (
                <>
                  <Modal.Header closeButton>
                    <Modal.Title>Ajout</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <FormAddEdit />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant='secondary' onClick={value.handleClose}>
                      Close
                    </Button>
                    <Button variant='primary'>Ajouter</Button>
                  </Modal.Footer>
                </>
              );
            default:
              return null;
          }
        })()}
      </Modal>
    </>
  );
}

export default Modals;
