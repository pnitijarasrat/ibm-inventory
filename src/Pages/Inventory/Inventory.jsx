import React from "react";
import { Table, Row, Col, Card, Statistic, Button, Flex } from "antd";

export default function Inventory({ inventory, handleDelete }) {
  let goodCondition = 0;
  let defect = 0;
  let loss = 0;
  for (let i = 0; i < inventory.length; i++) {
    goodCondition = goodCondition + parseInt(inventory[i].goodCondition);
    defect = defect + parseInt(inventory[i].defect);
    loss = loss + parseInt(inventory[i].loss);
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
      title: "Received Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Expired Date",
      dataIndex: "expires",
      key: "expires",
    },
    // {
    //   title: "Action",
    //   key: "expires",
    //   render: (record) => {
    //     return (
    //       <Flex>
    //         <Button onClick={() => handleDelete(record.code)}>Delete</Button>
    //       </Flex>
    //     );
    //   },
    // },
  ];
  return (
    <>
      <h1>Inventory</h1>
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
      <Table columns={columns} dataSource={inventory} />
    </>
  );
}
