import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "redux";
import { Button, Input, message } from "antd";
import { userLogout } from "../../actions/user-actions";
import axios from "axios";

import "./editTodoText.css";

const { TextArea } = Input;

class EditTodoText extends Component {
  state = {
    edit: false,
    textAreaValue: "",
  };
  success = () => {
    message.success("Успешно отредактировано");
  };

  error = () => {
    message.error("Редактирование доступно только Авторизованным пользователям");
  };

  handleEditClick = () => {
    const { text, user } = this.props;
    const { textAreaValue } = this.state;
    const value = (textAreaValue) ? textAreaValue : text;
    if (!user) return this.error();
    this.setState({
      edit: true,
      textAreaValue: value
    });
  };

  handleClose = (edit) => {
    this.setState({ edit });
  }

  handleChange = (e) => {
    this.setState({ textAreaValue: e.target.value });
  }

  handleSubmit = () => {
    const { user, text, todoId, userLogout } = this.props;
    const { textAreaValue } = this.state;
    if (!user) {
      this.error();
      this.handleClose(false);
      return;
    };
    if (text === textAreaValue) {
      this.handleClose(false);
      return;
    };
    axios.post("http://localhost:8080/~shapoval/test-task-backend/v2/edit", { textAreaValue, todoId },
      { withCredentials: true })
      .then(({ date }) => {
        this.success();
        this.handleClose();
      })
      .catch(err => {
        userLogout();
        this.error();
        this.handleClose();
      });
  }

  render() {
    const { text, editByAdmin } = this.props
    const { edit, textAreaValue } = this.state;
    const saveCancelBlock = (
      <div>
        <Button
          htmlType="submit"
          onClick={() => this.handleSubmit()}
          icon="check"
          type="primary"
        />
        <Button
          onClick={() => this.handleClose(false)}
          style={{ marginLeft: "10px" }}
          icon="close"
          type="danger"
        />
      </div>
    );
    const openEditBlock = (
      <Button icon="edit" onClick={this.handleEditClick} />
    )
    return (
      <React.Fragment>
        <div className="todo-text">
          {
            (edit) ? (
              <TextArea
                onChange={this.handleChange}
                value={textAreaValue} />
            ) : (
                <span>
                  {textAreaValue || text}
                </span>
              )
          }
        </div>
        <div className="edit-todos">
          {
            (editByAdmin)
              ? <span style={{ flex: 1 }}>
                Отредактировано Админастратором
              </span> : null
          }
          {
            (edit)
              ? saveCancelBlock
              : openEditBlock
          }
        </div>
      </React.Fragment>
    )
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
)(EditTodoText);