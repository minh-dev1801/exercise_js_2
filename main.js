import "./qlts.js";
import "./electricityCalc.js";
import "./taxCalc.js";
import "./cableCalc.js";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Tab  ~~~~~~~~~~~~~~~~~~~~~~~~~~
function showSection(sectionId, btnId) {
  const sections = [
    "qlts-tuyen-sinh",
    "electricity-calc",
    "tax-calc",
    "cable-calc",
  ];
  const buttons = ["btn-qlts", "btn-electricity", "btn-tax", "btn-cable"];

  sections.forEach((id) => {
    document.getElementById(id).style.display = "none";
  });

  buttons.forEach((id) => {
    document.getElementById(id).classList.remove("btn-primary", "active");
    document.getElementById(id).classList.add("btn-outline-primary");
  });

  document.getElementById(sectionId).style.display = "block";

  document.getElementById(btnId).classList.add("btn-primary", "active");
}

window.showSection = showSection;
