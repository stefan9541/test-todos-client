import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { Pagination, Col, Icon, Row } from "antd";
import qstr from "query-string";

const PaginationComponent = (props) => {
  const itemRender = (current, type) => {
    const { location: { pathname, search } } = props;
    const searchParam = qstr.parse(search);
    searchParam.developer = "Stepan"

    delete searchParam.page;

    const params = `&${qstr.stringify(searchParam)}`;

    switch (type) {
      case "page":
        return <Link to={`?page=${current}${params}`}>{current}</Link>;
      case "prev":
        return (
          <Link className="ant-pagination-item-link" to={`${pathname}?page=${current}${params}`}>
            <Icon type="left" />
          </Link>
        );
      case "next":
        return (
          <Link className="ant-pagination-item-link" to={`${pathname}?page=${current}${params}`}>
            <Icon type="right" />
          </Link>
        );
      case "jump-prev":
        return (
          <Link className="ant-pagination-item-link" to={`${pathname}?page=${current}${params}`}>
            <Icon type="double-left" />
          </Link>
        );
      case "jump-next":
        return (
          <Link className="ant-pagination-item-link" to={`${pathname}?page=${current}${params}`}>
            <Icon type="double-right" />
          </Link>
        );
      default:
        break;
    }
  };

  const { total, current } = props;
  return (
    <Row type="flex" justify="center">
      <Col style={{ marginTop: "15px", display: "flex", justifyContent: "center" }} span={6}>
        <Pagination
          hideOnSinglePage
          className="pagination-container"
          itemRender={itemRender}
          defaultCurrent={1}
          total={total}
          current={current}
          pageSize={3}
        />
      </Col>
    </Row>
  );
}

export default withRouter(PaginationComponent);