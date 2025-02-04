// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Tính tiền điện  ~~~~~~~~~~~~~~~~~~~~~~~~~~
document.addEventListener("DOMContentLoaded", function () {
  const elElectricityName = document.getElementById("electricity-name");
  const elElectricityUsage = document.getElementById("electricity-usage");
  const elElectricityResult = document.getElementById("electricity-result");
  const elElectricityBtn = document.getElementById("electricity-btn");

  if (
    !elElectricityName ||
    !elElectricityUsage ||
    !elElectricityResult ||
    !elElectricityBtn
  ) {
    console.error("❌ Lỗi: Không tìm thấy một số phần tử cần thiết trong DOM!");
    return;
  }

  elElectricityBtn.onclick = function () {
    const name = elElectricityName.value.trim();
    const usage =
      elElectricityUsage.value.trim() === ""
        ? NaN
        : Number(elElectricityUsage.value);

    if (usage <= 0 || isNaN(usage)) {
      elElectricityResult.innerHTML = "⚠ Vui lòng nhập số kWh hợp lệ!";
      elElectricityResult.classList.replace("alert-info", "alert-danger");
      elElectricityResult.style.display = "block";
      return;
    }

    const priceBrackets = [
      { threshold: 50, price: 500 },
      { threshold: 100, price: 650 },
      { threshold: 200, price: 850 },
      { threshold: 350, price: 1100 },
      { threshold: Infinity, price: 1300 },
    ];

    let totalCost = 0;
    let remainingUsage = usage;
    let prevThreshold = 0;

    for (let index = 0; index < priceBrackets.length; index++) {
      let { threshold, price } = priceBrackets[index];
      if (remainingUsage > 0) {
        let usageInThisBracket = Math.min(remainingUsage, threshold - prevThreshold)
        totalCost += usageInThisBracket * price
        remainingUsage -= usageInThisBracket
        prevThreshold = threshold
      } else {
        break;
      }
    }

    elElectricityResult.innerHTML = `👉 Họ tên: <strong>${name}</strong>; Tiền điện: <strong>${totalCost.toLocaleString()} VNĐ</strong>.`;
    elElectricityResult.classList.replace("alert-danger", "alert-info");
    elElectricityResult.style.display = "block";
  };
});
