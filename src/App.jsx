import { useState } from "react";
import "./App.css";
import { Flex, Button, Space, Divider, Tabs } from "antd";
import ReceiveModal from "./Modal/ReceiveModal";
import MoveModal from "./Modal/MoveModal";
import ActivityLog from "./Pages/ActivityLog/ActivityLog";
import Inventory from "./Pages/Inventory/Inventory";
import Shelft from "./Pages/Shelf/Shelf";

function App() {
  const [isReceive, setIsReceive] = useState(false);
  const [isMove, setIsMove] = useState(false);
  const [inventory, setInventory] = useState(
    JSON.parse(localStorage.getItem("inventory")) || [],
  );
  const [activityLog, setActivityLog] = useState(
    JSON.parse(localStorage.getItem("activity")) || [],
  );
  const [onShelf, setOnShelf] = useState(
    JSON.parse(localStorage.getItem("onShelf")) || [],
  );

  const openReceiveModal = () => {
    setIsReceive(true);
  };
  const closeReceiveModal = () => setIsReceive(false);
  const openMoveModal = () => {
    setIsMove(true);
  };
  const closeMoveModal = () => {
    setIsMove(false);
  };

  const handleReceiveInventory = (payload) => {
    const newInventory = [...inventory, payload];
    const newActivityLog = [
      ...activityLog,
      {
        ...payload,
        actionDate: new Date().toLocaleString(),
        action: "receive",
      },
    ];
    setInventory(newInventory);
    localStorage.setItem("inventory", JSON.stringify(newInventory));
    setActivityLog([...activityLog, newActivityLog]);
    localStorage.setItem("activity", JSON.stringify(newActivityLog));

    window.location.reload();
  };

  const handleDeleteInventory = (id) => {
    const newActivityLog = [
      ...activityLog,
      {
        ...inventory.filter((inven) => inven.code === id)[0],
        actionDate: new Date().toLocaleString(),
        action: "delete",
      },
    ];
    const newInventory = inventory.filter((inven) => inven.code !== id);
    setInventory(newInventory);
    localStorage.setItem("inventory", JSON.stringify(newInventory));
    setActivityLog([...activityLog, newActivityLog]);
    localStorage.setItem("activity", JSON.stringify(newActivityLog));

    window.location.reload();
  };

  const handleClear = () => {
    localStorage.removeItem("inventory");
    localStorage.removeItem("activity");
    localStorage.removeItem("onShelf");

    window.location.reload();
  };

  const handleMoveToShelf = (id) => {
    const newOnShelf = [
      ...onShelf,
      {
        ...inventory.filter((inven) => inven.code === id)[0],
        moveDate: new Date().toLocaleString(),
      },
    ];
    const newInventory = inventory.filter((inven) => inven.code !== id);
    const newActivityLog = [
      ...activityLog,
      {
        ...inventory.filter((inven) => inven.code === id)[0],
        actionDate: new Date().toLocaleString(),
        action: "move to shelf",
      },
    ];
    setOnShelf(newOnShelf);
    localStorage.setItem("onShelf", JSON.stringify(newOnShelf));
    setInventory(newInventory);
    localStorage.setItem("inventory", JSON.stringify(newInventory));
    setActivityLog([...activityLog, newActivityLog]);
    localStorage.setItem("activity", JSON.stringify(newActivityLog));

    window.location.reload();
  };

  const items = [
    {
      key: "1",
      label: "Activity Log",
      children: <ActivityLog activityLog={activityLog} />,
    },
    {
      key: "2",
      label: "Inventory",
      children: (
        <Inventory handleDelete={handleDeleteInventory} inventory={inventory} />
      ),
    },
    {
      key: "3",
      label: "On Shelf",
      children: <Shelft onShelf={onShelf} />,
    },
  ];

  return (
    <>
      <div>
        <h1>Action</h1>
        <Flex justify="center" gap="middle">
          <Button onClick={openReceiveModal}>Receive Inventory</Button>
          <Button onClick={openMoveModal}>Move to Shelf</Button>
          <Button onClick={handleClear}>Clear</Button>
        </Flex>
        <Divider />
        <Tabs defaultActiveKey="1" items={items} />
      </div>
      <ReceiveModal
        isOpen={isReceive}
        handleClose={closeReceiveModal}
        handleReceiveInventory={handleReceiveInventory}
        currentInventory={inventory}
        currentShelf={onShelf}
      />
      <MoveModal
        handleMoveToShelf={handleMoveToShelf}
        isOpen={isMove}
        handleClose={closeMoveModal}
        inventory={inventory}
      />
    </>
  );
}

export default App;
