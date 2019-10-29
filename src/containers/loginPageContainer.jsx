import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose, bindActionCreators } from "redux";
import * as userAction from "../actions/user-actions";
import axios from "axios";

import LoginPage from "../components/loginPage"

class LoginPageContainer extends Component {
  handleSubmit = (e, err, values, setFields) => {
    const {
      fetchUserRequst,
      fetchUserSuccess,
      history
    } = this.props;

    e.preventDefault();
    fetchUserRequst();
    if (!err) {
      axios.post("https://test-task-todos.herokuapp.com/~shapoval/test-task-backend/v2/login", { values }, { withCredentials: true })
        .then(({ data }) => {
          history.push("/");
          fetchUserSuccess(data);
        })
        .catch(err => {
          setFields({
            password: {
              value: values.password,
              errors: [new Error(err.response.data.message.password)],
            },
          });
        })
    }
  }

  render() {
    return (
      <LoginPage handleSubmit={this.handleSubmit} />
    );
  }
};

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    error: state.userReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...userAction }, dispatch);
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(LoginPageContainer);
