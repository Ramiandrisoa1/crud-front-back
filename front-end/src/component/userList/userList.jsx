import React from 'react';
import User from './user';

const UserList = () => {
  return (
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
  );
};

export default UserList;
