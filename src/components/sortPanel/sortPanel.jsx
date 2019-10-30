import React from 'react';
import { withRouter } from "react-router-dom";
import { Col, Form, Radio, Button } from "antd";
import qstr from "query-string";

const SortPanel = (props) => {
  const { location: { search } } = props;
  const searchParam = qstr.parse(search);
  const { validateFields } = props.form;
  const { getFieldDecorator } = props.form;
  const valueForSortField = searchParam.sortField || "";
  const valueForSortDirection = searchParam.sortDirection || "desc";
  const { history } = props;

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        const { sortDirection, sortField } = values;
        searchParam.developer = "Stepan";

        delete searchParam.sortDirection;
        delete searchParam.sortField;

        const params = `${qstr.stringify(searchParam)}`;
        history.push(`?${params}&sortField=${sortField}&sortDirection=${sortDirection}`)
      }
    });
  }

  const radioButtons = [
    { label: "По Имени", value: "username" },
    { label: "По email", value: "email" },
    { label: "По Статусу", value: "status" }
  ];

  return (
    <Col>
      <Form onSubmit={handleSubmit}>

        <span>Сортировать по</span>
        
        <Form.Item style={{ marginBottom: "0px" }}>
          {getFieldDecorator("sortField", {
            initialValue: valueForSortField,
            rules: [{ required: true }]
          })(
            <Radio.Group buttonStyle="solid">
              {
                radioButtons.map(({ label, value }) => {
                  return (
                    <Radio.Button key={value} value={value}>
                      {label}
                    </Radio.Button>
                  )
                })
              }
            </Radio.Group>
          )}
        </Form.Item>

        <Form.Item style={{ marginBottom: "0px" }}>
          {getFieldDecorator("sortDirection", {
            initialValue: valueForSortDirection
          })(
            <Radio.Group buttonStyle="solid">
              <Radio.Button value={"desc"}>
                Убыванию
              </Radio.Button>
              <Radio.Button value={"asc"}>
                Возрастанию
              </Radio.Button>
            </Radio.Group>
          )}
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Сортировать
        </Button>
      </Form>
    </Col>
  );
}

export default Form.create()(withRouter(SortPanel));