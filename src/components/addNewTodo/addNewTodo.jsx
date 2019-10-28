import React from 'react';
import { Col, Button, Popover, Icon, Tooltip } from "antd";

import AddNewTodoForm from "../addNewTodoForm";

const AddNewTodo = (props) => {
  const { visible, handleVisibleChange, handleSubmit, handleHide } = props;
  return (
    <Col>
      <Tooltip placement="topLeft" title="Добавить задачу">
        <Popover
          placement="leftTop"
          content={
            <AddNewTodoForm
              handleHide={handleHide}
              handleSubmit={handleSubmit}
            />
          }
          title="Новая задача"
          trigger="click"
          overlayStyle={{ width: "375px" }}
          visible={visible}
          onVisibleChange={handleVisibleChange}
        >
          <Button type="primary">
            <Icon type="plus" />
          </Button>
        </Popover>
      </Tooltip>
    </Col>
  );
}

export default AddNewTodo;