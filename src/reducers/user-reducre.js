const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER_REQUEST":
      return {
        user: null,
      };
    case "FETCH_USER_SUCCESS":
      return {
        user: action.payload,
      };

    case "USER_LOGOUT":
      return {
        user: null
      }
    default:
      return state;
  }
};

export default userReducer;