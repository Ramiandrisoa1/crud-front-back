import React, { useState, createContext, useEffect } from 'react';
import userService from '../../service/user.service';
import { Button } from 'react-bootstrap';
import Modals from '../modal/modal';

const ShowContext = createContext();

const UserList = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const handleClose = () => {
    setData(null);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const editUser = (user) => {
    setData(user);
    setShow(true);
  };
  const initialValue = [];

  const [users, setUser] = useState(initialValue);

  useEffect(() => {
    userService.getAllUser().then((res) => {
      setUser(res);
    });
  }, []);

  const deleteUser = (id) => {
    setUser(users.filter((user) => user._id !== id));
    userService.deleteUser(id);
  };

  const listUser = users.map((user) => (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.poste}</td>
      <td>
        <button onClick={() => deleteUser(user._id)}>Delete</button>
        <button onClick={() => editUser(user)}>edit</button>
      </td>
    </tr>
  ));
  return (
    <>
      <div>
        <Button variant='primary' onClick={handleShow}>
          Ajout
        </Button>
        <ShowContext.Provider value={{ show, handleClose, data }}>
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
          <tbody>{listUser}</tbody>
        </table>
      </div>
    </>
  );
};
export { ShowContext };
export default UserList;
