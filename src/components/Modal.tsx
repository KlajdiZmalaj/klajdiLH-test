import React from "react";
import { Modal } from "antd";
import UserForm from "./Forms/UserForm";
import RestaurantForm from "./Forms/RestaurantForm";
import MenuForm from "./Forms/MenuForm";
import MenuItemForm from "./Forms/MenuItemForm";

interface modalPopTypes {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  title: string;
  setModalData: React.Dispatch<React.SetStateAction<boolean>>;
  modalData: object;
  isCreating?: boolean;
}
export default ({
  modalData,
  isModalOpen,
  setModalData,
  title,
  type,
  setIsModalOpen,
  isCreating = true,
}: modalPopTypes) => {
  return (
    <Modal
      destroyOnClose={true}
      footer={false}
      title={`${isCreating ? "Create" : "Edit"} ${title}`}
      onCancel={() => {
        setIsModalOpen(false);
      }}
      open={isModalOpen}
    >
      {type === "user" && <UserForm isCreating={isCreating} modalData={modalData} setModalData={setModalData} />}
      {type === "restaurant" && (
        <RestaurantForm isCreating={isCreating} modalData={modalData} setModalData={setModalData} />
      )}
      {type === "menu" && <MenuForm isCreating={isCreating} modalData={modalData} setModalData={setModalData} />}
      {type === "menu_item" && (
        <MenuItemForm isCreating={isCreating} modalData={modalData} setModalData={setModalData} />
      )}
    </Modal>
  );
};
