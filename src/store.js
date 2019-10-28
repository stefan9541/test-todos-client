import { createStore, combineReducers } from "redux";
import todoReducer from "./reducers/todo-reducer";
import userReducer from "./reducers/user-reducre";

const reducers = combineReducers({
  todoReducer,
  userReducer
});

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
