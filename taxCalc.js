// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Tính Thuế Thu Nhập Cá Nhân ~~~~~~~~~~~~~~~~~~~~~~~~~~
document.addEventListener("DOMContentLoaded", function () {
  const elTaxName = document.getElementById("tax-name");
  const elTaxIncome = document.getElementById("tax-income");
  const elTaxDependents = document.getElementById("tax-dependents");
  const elTaxResult = document.getElementById("tax-result");
  const elTaxBtn = document.getElementById("tax-btn");

  if (
    !elTaxName ||
    !elTaxIncome ||
    !elTaxDependents ||
    !elTaxResult ||
    !elTaxBtn
  ) {
    console.error("❌ Lỗi: Không tìm thấy một số phần tử cần thiết trong DOM!");
    return;
  }

  elTaxBtn.onclick = function () {
    const name = elTaxName.value.trim();
    const income =
      elTaxIncome.value.trim() === "" ? NaN : Number(elTaxIncome.value);
    const dependents = Number(elTaxDependents.value);

    if (income <= 0 || isNaN(income) || dependents < 0 || isNaN(dependents)) {
      elTaxResult.innerHTML = "⚠ Vui lòng nhập thông tin hợp lệ!";
      elTaxResult.classList.replace("alert-info", "alert-danger");
      elTaxResult.style.display = "block";
      return;
    }

    const personalDeduction = 4000000;
    const dependentDeduction = 1600000;
    let taxableIncome =
      income - personalDeduction - dependents * dependentDeduction;

    const taxBrackets = [
      { threshold: 60000000, rate: 0.05 },
      { threshold: 120000000, rate: 0.1 },
      { threshold: 210000000, rate: 0.15 },
      { threshold: 384000000, rate: 0.2 },
      { threshold: 624000000, rate: 0.25 },
      { threshold: 960000000, rate: 0.3 },
      { threshold: Infinity, rate: 0.35 },
    ];

    let tax = 0;
    for (let i = 0; i < taxBrackets.length; i++) {
      let { threshold, rate } = taxBrackets[i];
      if (taxableIncome <= threshold) {
        tax = taxableIncome * rate;
        break;
      }
    }

    elTaxResult.innerHTML = `👉 Họ tên: <strong>${name}</strong>; Số thuế phải nộp: <strong>${tax.toLocaleString()} VNĐ</strong>.`;
    elTaxResult.classList.replace("alert-danger", "alert-info");
    elTaxResult.style.display = "block";
  };
});
