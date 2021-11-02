export const users = [];

export const addUser = (user ) => {
  !users.some((item) => item._id === user._id) &&
    users.push(user);
};

export const removeUser = (user) => {
  users = users.filter((item) => item.user._id !== user._id);
};

export const getUser = (user) => {
  return users.find((item) => item.user._id === user._id);
};
