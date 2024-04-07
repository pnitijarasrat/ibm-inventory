import React from "react";
import { Modal, Form, Flex, Input, Button, Select } from "antd";

export default function MoveModal({
  handleMoveToShelf,
  inventory,
  isOpen,
  handleClose,
}) {
  const [moveForm] = Form.useForm();
  const handleMove = () => {
    console.log(moveForm.getFieldsValue());
    handleMoveToShelf(moveForm.getFieldsValue().lot);
  };
  const onLotChange = (value) => {
    moveForm.setFieldsValue(
      inventory.filter((inven) => inven.code === value)[0],
    );
  };

  return (
    <Modal open={isOpen} footer={null} closeIcon={false}>
      <h1>Move to Shelf</h1>
      <Form labelCol={{ span: 6 }} onFinish={handleMove} form={moveForm}>
        <Form.Item name="lot" label="Moving Lot" rules={[{ required: true }]}>
          <Select
            onChange={onLotChange}
            options={inventory.map((inven) => ({
              label: inven.code,
              value: inven.code,
            }))}
          />
        </Form.Item>
        <Form.Item name="goodCondition" label="Good Condition">
          <Input disabled />
        </Form.Item>
        <Flex justify="end" gap="middle">
          <Button type="primary" htmlType="submit">
            Move
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Flex>
      </Form>
    </Modal>
  );
}
