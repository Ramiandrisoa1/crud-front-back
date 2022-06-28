import React, { useState } from 'react';
import User from './user';
import { Button } from 'react-bootstrap';
import Modals from '../modal/modal';

const UserList = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Launch demo modal
      </Button>
      <Modals
        handleClose={handleClose}
        show={show}
        handleShow={handleShow}
        setShow={setShow}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>email</th>
            <th>poste</th>
            <th>Action</th>
          </tr>
        </thead>
        <User />
      </table>
    </>
  );
};

export default UserList;
