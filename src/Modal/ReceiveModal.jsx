import React from "react";
import { Modal, Button, message, Form, Input, Flex } from "antd";

export default function ReceiveModal({
  isOpen,
  currentInventory,
  handleClose,
  handleReceiveInventory,
  currentShelf,
}) {
  const [receiveForm] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const today = new Date();
  const nextMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
  );

  const handleReceive = () => {
    const payload = {
      ...receiveForm.getFieldsValue(),
      date: today.toLocaleString(),
      expires: nextMonth.toLocaleString(),
    };
    if (currentInventory.map((item) => item.code).includes(payload.code))
      return error();
    if (currentShelf.map((item) => item.code).includes(payload.code))
      return error();
    handleReceiveInventory(payload);
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "This lot is already in this branch",
    });
  };

  return (
    <>
      {contextHolder}
      <Modal open={isOpen} footer={null} closeIcon={null}>
        <h1>Receive Items</h1>
        <Form
          labelCol={{ span: 6 }}
          form={receiveForm}
          onFinish={handleReceive}
        >
          <Form.Item name="code" label="Code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="goodCondition"
            rules={[{ required: true }]}
            label="Good Condition"
          >
            <Input />
          </Form.Item>
          <Form.Item name="defect" rules={[{ required: true }]} label="Defect">
            <Input />
          </Form.Item>
          <Form.Item name="loss" rules={[{ required: true }]} label="Loss">
            <Input />
          </Form.Item>
          <Flex gap="middle" justify="end">
            <Button type="primary" htmlType="submit">
              Confirm Receive
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Flex>
        </Form>
      </Modal>
    </>
  );
}
