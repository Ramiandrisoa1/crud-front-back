import api from '../component/api/api';

const getAllUser = async () => {
  const response = await api.get('/list-user');
  return response.data;
};

const userService = {
  getAllUser,
};

export default userService;
