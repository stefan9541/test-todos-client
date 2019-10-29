import React from 'react';
import TodoList from "../todoList";
import HeaderPanel from "../headerPanel";

const HomePage = () => {
  return (
    <React.Fragment>
      <HeaderPanel />
      <TodoList />
    </React.Fragment>
  );
}

export default HomePage;