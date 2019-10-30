import React from 'react';
import { Col, Form, Input, Button } from "antd";

const { TextArea } = Input;

const AddNewTodoForm = (props) => {
  const { getFieldDecorator, setFields, validateFields, resetFields } = props.form;
  const { handleSubmit } = props;

  const onSubmit = (e) => {
    validateFields((err, values) => {
      handleSubmit(e, err, values, setFields, resetFields);
    });
  }
  return (
    <Col>
      <Form onSubmit={onSubmit}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: "Поле является обязательным для заполнения" }],
          })(
            <Input
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{
              required: true,
              message: ["Поле является обязательным для заполнения"],
            }]
          })(
            <Input
              placeholder="email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('text', {
            rules: [{ required: true, message: "Поле является обязательным для заполнения" }],
          })(
            <TextArea
              autoSize={{ minRows: 3, maxRows: 10 }}
              placeholder="text"
            />
          )}
        </Form.Item>

        <Button htmlType="submit">
          Добавить
        </Button>
      </Form>
    </Col>
  );
}

export default Form.create({ name: "add_todo" })(AddNewTodoForm);