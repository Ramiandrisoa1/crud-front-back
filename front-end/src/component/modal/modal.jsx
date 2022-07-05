import React, { useContext, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ShowContext } from '../userList/userList';
import FormAddEdit from '../form/form';
import userService from '../../service/user.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Modals() {
  const value = useContext(ShowContext);

  const deleteUser = () => {
    value.setUser(
      value.users.filter((user) => user._id !== value.dataDelete._id)
    );
    userService.deleteUser(value.dataDelete._id).then(
      (res) => {
        console.log(res);
        toast.success(
          `La suppression de ${value.dataDelete.name} est réussie`,
          {
            autoClose: 1000,
          }
        );
        value.handleClose();
      },
      (err) => {
        console.log(err);
        toast.success(
          `La suppression de ${value.dataDelete.name} est réussie`,
          {
            autoClose: 1000,
          }
        );
      }
    );
  };

  const childRef = useRef(null);

  const handleClick = (event) => {
    childRef.current.handleSubmit(event);
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
                    <FormAddEdit ref={childRef} />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant='secondary' onClick={value.handleClose}>
                      Close
                    </Button>
                    <Button variant='primary' onClick={handleClick}>
                      Modifier
                    </Button>
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
                    <FormAddEdit ref={childRef} />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant='secondary' onClick={value.handleClose}>
                      Close
                    </Button>
                    <Button variant='primary' onClick={handleClick}>
                      Ajouter
                    </Button>
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
