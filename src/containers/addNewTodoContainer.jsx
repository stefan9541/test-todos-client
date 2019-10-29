import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import * as todoAction from "../actions/todo-actions";
import { message } from "antd"
import axios from "axios";

import AddNewTodo from "../components/addNewTodo";

class AddNewTodoContainer extends Component {

  state = {
    visible: false,
  };

  success = () => {
    message.success("Todo successfully added");
  };

  error = () => {
    message.error("smth wrong plz try again");
  };

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  handleSubmit = (e, err, values, setFields, resetFields) => {
    e.preventDefault();
    const { createNewTodo } = this.props;
    const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const validEmail = emailRegExp.test(values.email);

    if (err || !validEmail) {
      setFields({
        email: {
          value: values.email,
          errors: [new Error("Не валидный email")],
        }
      });
    } else {
      axios.post("https://test-task-todos.herokuapp.com/~shapoval/test-task-backend/v2/create", { values },
        { withCredentials: true })
        .then(({ data }) => {
          this.hide();
          this.success();
          createNewTodo(data.message)
          resetFields();
        })
        .catch(err => this.error())

    }
  };

  render() {
    return (
      <AddNewTodo
        handleSubmit={this.handleSubmit}
        handleHide={this.hide}
        handleVisibleChange={this.handleVisibleChange}
        visible={this.state.visible}
      />
    );
  }
};

const mapStateToProps = state => {
  return {
    todos: state.todoReducer.todos,
    loading: state.todoReducer.loading,
    error: state.todoReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...todoAction }, dispatch);
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(AddNewTodoContainer);