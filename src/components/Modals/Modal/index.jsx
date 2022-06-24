import React, { Children } from "react";
import "./index.css";

export function Modal({ children }) {
  return (
    <div
      className="modal"
      onClick={(e) => {
        if (e.target.classList.contains("modal")) {
          closeModal();
        }

        // e.stopPropagation();
        // console.log("Modal clicked");
      }}
    >
      <div className="modal__inner">
        {children}
        {/* Im the inner guy
        <button onClick={() => toggleModal()}>Toggle Modal</button> */}
      </div>
    </div>
  );
}

export const openModal = () => {
  // Working with raw el here so as to avoid props drilling for modal state
  const modalEl = document.querySelector(".modal");
  modalEl.classList.add("modal-open");
};

export const closeModal = () => {
  // Working with raw el here so as to avoid props drilling for modal state
  const modalEl = document.querySelector(".modal");
  modalEl.classList.remove("modal-open");
};
