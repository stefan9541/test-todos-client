import React from 'react';
import { Row, Col, Menu } from "antd"
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import * as userAction from "../../actions/user-actions";
import axios from "axios";


import "./header.css";

class Header extends React.Component {

  state = {
    current: "/",
  };

  componentDidMount() {
    const {
      fetchUserRequst,
      fetchUserSuccess
    } = this.props;

    fetchUserRequst();
    axios.post("http://localhost:8080/~shapoval/test-task-backend/v2/ajax_bz", {},
      { withCredentials: true })
      .then(({ data }) => {
        fetchUserSuccess(data);
      })
      .catch(err => console.log(err))
  }

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };

  logOut = () => {
    const { userLogout, history } = this.props;
    axios.post("http://localhost:8080/~shapoval/test-task-backend/v2/logOut", {},
      { withCredentials: true })
      .then(res => {
        userLogout();
        history.push("/");
      })
  }

  render() {
    const { user } = this.props;
    return (
      <Row type="flex" justify="center">
        <Col span={6}>
          <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" >
            <Menu.Item key="/">
              <Link to="/">
                Todos
              </Link>
            </Menu.Item>
            <Menu.Item key="login">
              {
                (user) ?
                  <span onClick={this.logOut}>Выйти</span>
                  :
                  <Link to="/login">
                    Войти
                  </Link>
              }
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...userAction }, dispatch);
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Header);