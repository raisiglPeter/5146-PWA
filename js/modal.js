const showModalButton = document.getElementById("show-modal-button");
const addModal = document.querySelector(".add-modal");
const resetButton = document.getElementById("add-modal-reset-button");

// Open the modal
export function openModal() {
  addModal.style.display = "flex";
  showModalButton.style.backgroundColor = "#f49cbb";
}

// Close the modal
export function closeModal() {
  addModal.style.display = "none";
  showModalButton.style.backgroundColor = "#f4f4f4";
}

// Reset the form when closing the modal
export function resetModal() {
  document
    .querySelectorAll(".recipe-input")
    .forEach((input) => (input.value = ""));
  document.getElementById("recipe-favourite").checked = false;
  document.querySelector(".steps-preview ol").innerHTML = "";
  document.querySelector(".tags-preview p").textContent = "";
}

// Event Listeners
showModalButton.addEventListener("click", () => {
  if (addModal.style.display === "none" || addModal.style.display === "") {
    openModal();
  } else {
    closeModal();
  }
});

resetButton.addEventListener("click", resetModal);
