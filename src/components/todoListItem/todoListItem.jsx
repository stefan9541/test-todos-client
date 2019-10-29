import React, { Component } from 'react';
import { Row, Col } from "antd";
import EditTodoText from "../editTodoText";
import EditTodoStatus from "../editTodoStatus"

import "./todoListItem.css"

class TodoListItem extends Component {
  render() {
    return (
      <Row id="list-item-container">
        <Col span={6}>
          {
            (this.props.items || []).slice(0, 3).map(({
              status, username, email, text, editByAdmin, _id
            }) => {
              return (
                <div key={_id} className="todo-list-item">

                  <EditTodoStatus todoId={_id} status={status} />

                  <div className="username">
                    <b>Имя:</b> <span>{username}</span>
                  </div>
                  <div className="user-email">
                    <b>Email:</b> <span>{email}</span>
                  </div>

                  <EditTodoText editByAdmin={editByAdmin} todoId={_id} text={text} />
                </div>
              );
            })
          }
        </Col>
      </Row >
    );
  }
}

export default TodoListItem;