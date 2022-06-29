import React, { useState, createContext } from 'react';
import User from './user';
import { Button } from 'react-bootstrap';
import Modals from '../modal/modal';

const ShowContext = createContext();

const UserList = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div>
        <Button variant='primary' onClick={handleShow}>
          Launch demo modal
        </Button>
        <ShowContext.Provider value={{ show, handleClose }}>
          <Modals />
        </ShowContext.Provider>
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
      </div>
    </>
  );
};
export { ShowContext };
export default UserList;
