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

  const setupControl = ({ inputId, storageKey, labels, className }) => {
    const input = document.getElementById(inputId);
    const label = document.querySelector(`label[for="${inputId}"]`);
    if (!input || !label) return;

    // Wrap localStorage in try-catch to prevent crashes if cookies are disabled
    let saved = null;
    try {
      saved = localStorage.getItem(storageKey);
    } catch (e) {
      console.warn("LocalStorage access denied");
    }

    if (saved !== null) {
      input.checked = saved === "true";
    }

    const updateUI = () => {
      label.textContent = labels[input.checked ? 1 : 0];
      // Toggle the class on the html tag based on the checkbox state
      if (input.checked) {
        document.documentElement.classList.add(className);
      } else {
        document.documentElement.classList.remove(className);
      }
    };

    updateUI();

    input.addEventListener("change", () => {
      try {
        localStorage.setItem(storageKey, input.checked);
      } catch (e) {
        // block errors
      }
      updateUI();
    });
  };

  setupControl({
    inputId: "contrast",
    storageKey: "contrast",
    labels: ["Add more contrast", "Remove additional contrast"],
    className: "contrast",
  });

  setupControl({
    inputId: "invmode",
    storageKey: "inverted",
    labels: ["Inverted mode", "Normal mode"],
    className: "inverted",
  });
})();
