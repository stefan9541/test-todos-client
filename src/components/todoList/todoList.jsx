import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose, bindActionCreators } from "redux";
import * as todoAction from "../../actions/todo-actions";
import qstr from "query-string";
import axios from "axios";

import "./todoList.css"

import TodoListItem from "../todoListItem"
import PaginationComponent from '../pagination';

class TodoList extends Component {
  fetchData = () => {
    const {
      fetchTodoDataFailure,
      fetchTodoDataSuccess,
      fetchTodoeDataRequest,
      location
    } = this.props;
    const parseParams = qstr.parse(location.search);
    parseParams.developer = "Stepan";

    fetchTodoeDataRequest();
    axios.get("https://test-task-todos.herokuapp.com/",
      { params: { ...parseParams } })
      .then(({ data }) => { fetchTodoDataSuccess(data) })
      .catch(err => fetchTodoDataFailure(err));
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.fetchData();
    }
  }

  render() {
    const { todos: { message = [], currentPage } } = this.props;
    const { tasks, totalTaskCount } = message;
    const current = (currentPage + 1) || null;
    return (
      <React.Fragment>

        <TodoListItem
          items={tasks}
        />
        <PaginationComponent
          current={current}
          total={totalTaskCount}
        />
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todoReducer.todos,
    loading: state.todoReducer.loading,
    error: state.todoReducer.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...todoAction }, dispatch);
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(TodoList);