const initialState = {
  todos: [],
  loading: true,
  error: null
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TODO_DATA_REQUEST":
      return {
        todos: [],
        loading: true,
        error: null
      };
    case "FETCH_TODO_DATA_SUCCESS":
      return {
        todos: action.payload,
        loading: false,
        error: null
      };

    case "FETCH_TODO_DATA_FAILURE":
      return {
        todos: [],
        loading: false,
        error: action.payload
      };
    case "CREATE_NEW_TODO":
      return {
        ...state,
        todos: {
          ...state.todos,
          message: {
            totalTaskCount: state.todos.message.totalTaskCount + 1,
            tasks: [
              action.payload,
              ...state.todos.message.tasks
            ]
          }
        }
      };
    default:
      return state;
  }
};

export default todoReducer;
