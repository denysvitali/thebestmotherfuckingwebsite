"use strict";

(() => {
  // 1. Rainbow thing (using requestAnimationFrame for 2025 performance)
  const rbw = document.getElementById("rbw");
  if (rbw) {
    let hue = 0;
    const animate = () => {
      rbw.style.color = `hsl(${hue}, 80%, 60%)`;
      hue = (hue + 5) % 360;
      requestAnimationFrame(animate);
    };
    animate();
  }

  const setupControl = ({ inputId, storageKey, labels }) => {

    const input = document.getElementById(inputId);
    const label = document.querySelector(`label[for="${inputId}"]`);
    if (!input || !label) return;
    const saved = localStorage.getItem(storageKey);
    if (saved !== null) {
      input.checked = saved === "true";
    }

    const updateUI = () => {
      label.textContent = labels[input.checked ? 1 : 0];
    };

    updateUI();

    input.addEventListener("change", () => {
      localStorage.setItem(storageKey, input.checked);
      updateUI();
    });
  };

  setupControl({
    inputId: "contrast",
    storageKey: "contrast",
    labels: ["Add more contrast", "Remove additional contrast"]
  });

  setupControl({
    inputId: "invmode",
    storageKey: "inverted",
    labels: ["Inverted mode", "Normal mode"]
  });
})();