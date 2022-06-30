import React, { useState, createContext, useEffect } from 'react';
import userService from '../../service/user.service';
import Modals from '../modal/modal';
import Table from 'react-bootstrap/Table';
import './userList.css';

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
      <td className='tbody-td'>{user.name}</td>
      <td className='tbody-td'>{user.email}</td>
      <td className='tbody-td'>{user.poste}</td>
      <td className='action'>
        <button className='btn-action' onClick={() => deleteUser(user._id)}>
          Delete
        </button>
        <button className='btn-action' onClick={() => editUser(user)}>
          edit
        </button>
      </td>
    </tr>
  ));
  return (
    <>
      <div className='tbl-content'>
        <div className='btn-add-content'>
          <h1>Liste des utilisateurs</h1>
          <button className='btn-add' onClick={handleShow}>
            Ajout
          </button>
        </div>
        <ShowContext.Provider value={{ show, handleClose, data }}>
          <Modals />
        </ShowContext.Provider>
        <Table striped bordered hover>
          <thead className='tb-thead'>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Poste</th>
              <th className='action'>Action</th>
            </tr>
          </thead>
          <tbody className='tb-tbody'>{listUser}</tbody>
        </Table>
      </div>
    </>
  );
};
export { ShowContext };
export default UserList;
