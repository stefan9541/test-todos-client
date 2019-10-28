import React from 'react';
import { Row, Col } from "antd";
import AddNewTodoContainer from "../../containers/addNewTodoContainer";
import SortPanel from "../sortPanel";

import "./headerPanel.css"

const HeaderPanel = () => {
  return (
    <Row style={{ marginTop: "10px" }} type="flex" justify="center">
      <Col id="header-panel-wrapp" span={6}>
        <AddNewTodoContainer />
        <SortPanel />
      </Col>
    </Row>
  );
}

export default HeaderPanel;