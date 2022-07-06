import React, { useState, createContext, useEffect } from 'react';
import userService from '../../service/user.service';
import Modals from '../modal/modal';
import Table from 'react-bootstrap/Table';
import './userList.css';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const ShowContext = createContext();

const UserList = () => {
  const [show, setShow] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [dataDelete, setDataDelete] = useState(null);
  const [status, setstatus] = useState(null);

  const handleClose = () => {
    setDataEdit(null);
    setShow(false);
  };

  const addUser = () => {
    setShow(true);
    setstatus('add');
  };

  const editUser = (user) => {
    setDataEdit(user);
    setShow(true);
    setstatus('edit');
  };

  const deleteUser = (user) => {
    setDataDelete(user);
    setShow(true);
    setstatus('delete');
  };

  const initialValue = [];

  const [users, setUser] = useState(initialValue);

  useEffect(() => {
    userService.getAllUser().then((res) => {
      setUser(res);
    });
  }, []);

  const listUser = users.map((user) => (
    <tr key={user._id}>
      <td className='tbody-td-1'>{user.name}</td>
      <td className='tbody-td-2'>{user.email}</td>
      <td className='tbody-td-3'>{user.poste}</td>
      <td className='action'>
        <button className='btn-delete' onClick={() => deleteUser(user)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button className='btn-edit' onClick={() => editUser(user)}>
          <FontAwesomeIcon icon={faPencil} />
        </button>
      </td>
    </tr>
  ));
  return (
    <>
      <ToastContainer />
      <div className='tbl-content'>
        <div className='btn-add-content'>
          <h1>Liste des utilisateurs</h1>
          <button className='btn-add' onClick={addUser}>
            <FontAwesomeIcon className='add-icon' icon={faPlus} />
            Ajouter
          </button>
        </div>
        <ShowContext.Provider
          value={{
            show,
            handleClose,
            dataEdit,
            dataDelete,
            status,
            setUser,
            users,
          }}
        >
          <Modals />
        </ShowContext.Provider>
        <Table striped bordered hover>
          <thead className='tb-thead'>
            <tr>
              <th className='action'>Name</th>
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
