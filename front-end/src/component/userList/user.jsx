import React, { useState, useEffect } from 'react';
import userService from '../../service/user.service';

const User = () => {
  const initialValue = [];

  const [users, setUser] = useState(initialValue);

  useEffect(() => {
    userService.getAllUser().then((res) => {
      setUser(res);
    });
  }, []);

  const listUser = users.map((user) => (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.poste}</td>
      <td>
        <button>Delete</button>
        <button>edit</button>
      </td>
    </tr>
  ));

  return <tbody>{listUser}</tbody>;
};

export default User;
