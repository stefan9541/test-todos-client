import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "redux";
import { Button, Input, message } from "antd";

import "./editTodoText.css";

const { TextArea } = Input;

class EditTodoText extends Component {
  state = {
    edit: false,
    textAreaValue: "",
  };

  success = () => {
    message.success("Todo successfully added");
  };

  error = () => {
    message.error("smth wrong plz try again");
  };

  handleEditClick = () => {
    const { text } = this.props;
    const { textAreaValue } = this.state;
    const value = (textAreaValue) ? textAreaValue : text;
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
    const { user } = this.props;
    console.log(user);
  }

  render() {
    const { text } = this.props
    const { edit, textAreaValue } = this.state;
    const saveCancelBlock = (
      <React.Fragment>
        <Button
          htmlType="submit"
          onClick={() => this.handleSubmit()}
          // onClick={() => this.handleClose(false)}
          icon="check"
          type="primary"
        />
        <Button
          onClick={() => this.handleClose(false)}
          style={{ marginLeft: "10px" }}
          icon="close"
          type="danger"
        />
      </React.Fragment>
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

export default compose(
  connect(mapStateToProps)
)(EditTodoText);