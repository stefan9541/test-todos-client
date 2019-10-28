export const fetchUserRequst = () => {
  return {
    type: "FETCH_USER_REQUEST",
  }
};

export const fetchUserSuccess = (user) => {
  return {
    type: "FETCH_USER_SUCCESS",
    payload: user
  }
};

export const userLogout = () => {
  return {
    type: "USER_LOGOUT"
  }
};