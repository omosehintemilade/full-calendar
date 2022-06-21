export const toggleModal = () => {
  // Working with raw el here so as to avoid props drilling for modal state
  const modalEl = document.querySelector(".modal");
  console.log(modalEl.classList);
  if (modalEl.classList.contains("modal-open")) {
    modalEl.classList.remove("modal-open");
  } else {
    modalEl.classList.add("modal-open");
  }
};

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
