// ~~~~~~~~~~~~~~~~~~~~~~~~~~ TÍNH TIỀN CÁP ~~~~~~~~~~~~~~~~~~~~~~~~~~
document.addEventListener("DOMContentLoaded", function () {
  const elCustomerType = document.getElementById("cable-customer-type");
  const elCustomerId = document.getElementById("cable-customer-id");
  const elBusinessConnection = document.getElementById(
    "cable-business-connection"
  );
  const elPremiumChannels = document.getElementById("cable-premium-channels");
  const elCableResult = document.getElementById("cable-result");
  const elBusinessConnectionGroup = document.getElementById(
    "cable-business-connection-group"
  );

  if (
    !elCustomerType ||
    !elCustomerId ||
    !elBusinessConnection ||
    !elPremiumChannels ||
    !elCableResult ||
    !elBusinessConnectionGroup
  ) {
    console.error("❌ Lỗi: Không tìm thấy một số phần tử cần thiết trong DOM!");
    return;
  }

  window.toggleConnectionInput = function () {
    if (elCustomerType.value === "business") {
      elBusinessConnectionGroup.style.display = "block";
    } else {
      elBusinessConnectionGroup.style.display = "none";
      elBusinessConnection.value = "";
    }
  };

  window.calculateCableBill = function () {
    const customerType = elCustomerType.value;
    const customerId = elCustomerId.value.trim();
    const premiumChannels = parseInt(elPremiumChannels.value) || 0;
    const connections = parseInt(elBusinessConnection.value) || 0;

    if (!customerType || !customerId) {
      elCableResult.innerHTML = "⚠ Vui lòng nhập đầy đủ thông tin!";
      elCableResult.classList.replace("alert-info", "alert-danger");
      elCableResult.style.display = "block";
      return;
    }

    let totalCost = 0;
    let baseFee = 20.5;

    if (customerType === "residential") {
      totalCost = 4.5 + baseFee + premiumChannels * 7.5;
    } else if (customerType === "business") {
      baseFee = 75;
      if (connections > 10) {
        baseFee += (connections - 10) * 5;
      }
      totalCost = 15 + baseFee + premiumChannels * 50;
    }

    elCableResult.innerHTML = `👉 Mã khách hàng: <strong>${customerId}</strong>; Tiền cáp phải trả: <strong>$${totalCost.toFixed(
      2
    )}</strong>.`;
    elCableResult.classList.replace("alert-danger", "alert-info");
    elCableResult.style.display = "block";
  };
});
