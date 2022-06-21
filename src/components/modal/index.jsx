import React, { Children } from "react";
import { closeModal, toggleModal } from "./helpers";
import "./index.css";

export default function Modal({ children }) {
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
