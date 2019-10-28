import React from 'react';
import { Row, Col, Form, Input, Button } from "antd";


const LoginPage = (props) => {
  const { getFieldDecorator, setFields, validateFields } = props.form;
  const { handleSubmit } = props;

  const onSubmit = (e) => {
    validateFields((err, values) => {
      handleSubmit(e, err, values, setFields);
    });
  }

  return (
    <Row style={{ marginTop: "10px" }} type="flex" justify="center">
      <Col span={6}>
        <Form
          autoComplete="off"
          onSubmit={onSubmit}
          className="login-form"
        >
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: "Поле является обязательным для заполнения" }],
            })(
              <Input
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: "Поле является обязательным для заполнения", }],
            })(
              <Input
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form>
      </Col>
    </Row>
  );
}


export default Form.create({ name: "login_form" })(LoginPage);