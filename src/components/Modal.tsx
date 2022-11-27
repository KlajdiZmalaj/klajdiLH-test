import React, { useMemo } from "react";
import { Modal } from "antd";
import { columnPropTypes } from "../routes/Dashboard";
import InputComponent from "./InputComponent";
import UserForm from "./UserForm";

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
    </Modal>
  );
};
