export const fetchTodoeDataRequest = () => {
  return {
    type: "FETCH_TODO_DATA_REQUEST"
  };
};

export const fetchTodoDataSuccess = (todos) => {
  return {
    type: "FETCH_TODO_DATA_SUCCESS",
    payload: todos,
  };
};
export const createNewTodo = (todo) => {
  return {
    type: "CREATE_NEW_TODO",
    payload: todo
  }
}
export const fetchTodoDataFailure = (err) => {
  return {
    type: "FETCH_TODO_DATA_FAILURE",
    payload: err
  };
};
