import React from "react";
import { Table, Space, Card, Row, Col, Statistic } from "antd";

export default function Shelft({ onShelf }) {
  let goodCondition = 0;
  let defect = 0;
  let loss = 0;
  for (let i = 0; i < onShelf.length; i++) {
    goodCondition = goodCondition + parseInt(onShelf[i].goodCondition);
    defect = defect + parseInt(onShelf[i].defect);
    loss = loss + parseInt(onShelf[i].loss);
  }

  const columns = [
    {
      title: "Lot",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Good Condition",
      dataIndex: "goodCondition",
      key: "goodCondition",
    },
    {
      title: "Defect",
      dataIndex: "defect",
      key: "defect",
    },
    {
      title: "Loss",
      dataIndex: "loss",
      key: "loss",
    },
    {
      title: "On Shelf Date",
      dataIndex: "moveDate",
      key: "moveDate",
    },
  ];

  return (
    <>
      <h1>Shelf</h1>
      <Card>
        <Row gutters={16}>
          <Col span={8}>
            <Statistic title="Good Condition" value={goodCondition} />
          </Col>
          <Col span={8}>
            <Statistic title="Defect" value={defect} />
          </Col>
          <Col span={8}>
            <Statistic title="Loss" value={loss} />
          </Col>
        </Row>
      </Card>
      <br />
      <Table columns={columns} dataSource={onShelf} />
    </>
  );
}
