import React, { Component } from 'react';
import { Row, Col, Checkbox } from "antd";
import EditTodoText from "../editTodoText";

import "./todoListItem.css"

class TodoListItem extends Component {
  render() {
    return (
      <Row id="list-item-container">
        <Col span={6}>
          {
            (this.props.items || []).slice(0, 3).map(({
              status, username, email, text, _id
            }) => {
              const isDone = (status) ? "Выполнен" : "Не выполнен";
              return (
                <div key={_id} className="todo-list-item">
                  <div className="todo-status">
                    <span>Status:&nbsp; {isDone}</span>
                    <Checkbox
                      name={username}
                      defaultChecked={status}
                    />
                  </div>
                  <div className="username">
                    <b>Имя:</b> <span>{username}</span>
                  </div>
                  <div className="user-email">
                    <b>Email:</b> <span>{email}</span>
                  </div>

                  <EditTodoText todoId={_id} text={text} />
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