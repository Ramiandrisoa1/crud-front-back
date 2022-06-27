import api from '../component/api/api';

const getAllUser = async () => {
  const response = await api.get('/list-user');
  return response.data;
};

const deleteUser = async (id) => {
  const response = await api.delete(`/delete/${id}`);
  return response;
};

const userService = {
  getAllUser,
  deleteUser,
};

export default userService;
