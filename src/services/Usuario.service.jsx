import { LocalStorageService } from "./LocalStorage.service";

const getUsers = () => {
  return LocalStorageService.get('users') || [];
};

const createUser = (data) => {
  const users = getUsers();
  data = {
    id: users.length + 1,
    ...data
  };
  users.push(data);
  LocalStorageService.set('users', users);
};

const getUserById = (id) => {
  return getUsers().find(user => user.id === id);
};

const getUserByEmail = (email) => {
  return getUsers().find(user => user.email === email);
};

const deleteUser = (id) => {
  const users = getUsers();
  const updatedUsers = users.filter(user => user.id !== id);
  LocalStorageService.set('users', updatedUsers);
};

const updateUser = (id, data) => {
  const users = getUsers();
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...data };
    LocalStorageService.set('users', users);
  }
};

export const UserService = {
  getUsers,
  createUser,
  getUserById,
  getUserByEmail,
  deleteUser,
  updateUser
};
