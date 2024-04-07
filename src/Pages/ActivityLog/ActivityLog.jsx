import React from "react";
import { Table, Space } from "antd";

export default function ActivityLog({ activityLog }) {
  const columns = [
    {
      title: "Lot",
      dataIndex: "code",
      key: "code",
    },

    {
      title: "Action Date",
      dataIndex: "actionDate",
      key: "actionDate",
    },

    {
      title: "Note",
      dataIndex: "action",
      key: "action",
    },
  ];

  return (
    <>
      <h1>Activity Log</h1>
      <Table columns={columns} dataSource={activityLog} />
    </>
  );
}
