document.addEventListener("DOMContentLoaded", () => {
  // 1. Set the hidden timestamp value on initial page load
  const timestampInput = document.getElementById("timestamp");
  if (timestampInput) {
    timestampInput.value = new Date().toLocaleString();
  }

  // 2. Handle HTML Modal Dialogs
  const modalPairs = [
    { btn: "btn-np", modal: "modal-np" },
    { btn: "btn-bronze", modal: "modal-bronze" },
    { btn: "btn-silver", modal: "modal-silver" },
    { btn: "btn-gold", modal: "modal-gold" }
  ];

  modalPairs.forEach(pair => {
    const button = document.getElementById(pair.btn);
    const dialog = document.getElementById(pair.modal);

    if (button && dialog) {
      button.addEventListener("click", () => {
        dialog.showModal();
      });

      const closeBtn = dialog.querySelector(".close-modal");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          dialog.close();
        });
      }

      // Close modal if user clicks backdrop outside modal dialog content
      dialog.addEventListener("click", (e) => {
        if (e.target === dialog) {
          dialog.close();
        }
      });
    }
  });
});