import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "redux";
import { userLogout } from "../../actions/user-actions";
import { Checkbox, message } from "antd";
import axios from "axios";

import "./editTodoStatus.css";

class EditTodoStatus extends Component {
  state = {
    done: false
  };

  success = () => {
    message.success("Успешно отредактировано");
  };

  error = () => {
    message.error("Редактирование доступно только Авторизованным пользователям");
  };

  componentDidMount() {
    this.setState({ done: this.props.status });
  }

  handleChange = (e) => {
    this.setState({ done: e.target.checked }, () => {
      const { todoId, userLogout } = this.props;
      const { done } = this.state;
      axios.post("https://test-task-todos.herokuapp.com/~shapoval/test-task-backend/v2/edit", { done, todoId },
        { withCredentials: true })
        .then(({ date }) => {
          this.success();
        })
        .catch(err => {
          userLogout();
          this.error();
        });
    });
  };

  render() {
    const { done } = this.state;
    const { user } = this.props;
    const isDone = (done) ? "Выполнено" : "Не выполнено";
    const disable = (user) ? false : true;
    return (
      <div className="todo-status">
        <span>Status:&nbsp; {isDone}</span>
        <Checkbox
          disabled={disable}
          onChange={this.handleChange}
          checked={done}
        />
      </div >
    );
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
};

const mapDispatchToProps = {
  userLogout
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(EditTodoStatus);