// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Quản lý tuyển sinh  ~~~~~~~~~~~~~~~~~~~~~~~~~~
document.addEventListener("DOMContentLoaded", () => {
  const tagDiemChuan = document.getElementById("qlts-diem-chuan");
  const tagDiemMon1 = document.getElementById("qlts-diem-mon1");
  const tagDiemMon2 = document.getElementById("qlts-diem-mon2");
  const tagDiemMon3 = document.getElementById("qlts-diem-mon3");
  const tagKhuVuc = document.getElementById("qlts-khu-vuc");
  const tagDoiTuong = document.getElementById("qlts-doi-tuong");
  const tagKqTinhDiem = document.getElementById("qlts-kq");

  if (
    !tagDiemChuan ||
    !tagDiemMon1 ||
    !tagDiemMon2 ||
    !tagDiemMon3 ||
    !tagKhuVuc ||
    !tagDoiTuong ||
    !tagKqTinhDiem
  ) {
    console.error("❌ Lỗi: Không tìm thấy một số phần tử cần thiết trong DOM!");
    return;
  }

  document.getElementById("qlts-btn").onclick = function () {
    const diemChuan = Number(tagDiemChuan.value);
    const diemMon1 =
      tagDiemMon1.value.trim() === "" ? NaN : Number(tagDiemMon1.value);
    const diemMon2 =
      tagDiemMon2.value.trim() === "" ? NaN : Number(tagDiemMon2.value);
    const diemMon3 =
      tagDiemMon3.value.trim() === "" ? NaN : Number(tagDiemMon3.value);

    const khuVuc = tagKhuVuc.value;
    const doiTuong = tagDoiTuong.value;

    if ([diemMon1, diemMon2, diemMon3].some((diem) => diem === 0)) {
      tagKqTinhDiem.innerHTML = "❌ Rất tiếc! Bạn đã rớt vì có môn bị 0 điểm.";
      tagKqTinhDiem.classList.replace("alert-info", "alert-danger");
      tagKqTinhDiem.style.display = "block";
      return;
    }

    if (
      [diemMon1, diemMon2, diemMon3].some(isNaN) ||
      [diemMon1, diemMon2, diemMon3].some((diem) => diem > 10) ||
      diemChuan <= 0 ||
      diemChuan > 30
    ) {
      tagKqTinhDiem.innerHTML = "⚠ Vui lòng nhập đầy đủ và đúng thông tin!";
      tagKqTinhDiem.classList.replace("alert-info", "alert-danger");
      tagKqTinhDiem.style.display = "block";
      return;
    }

    let diemKhuVuc;
    if (khuVuc === "A") diemKhuVuc = 2;
    else if (khuVuc === "B") diemKhuVuc = 1;
    else if (khuVuc === "C") diemKhuVuc = 0.5;
    else if (khuVuc === "") diemKhuVuc = 0;

    let diemDoiTuong;
    if (doiTuong === "1") diemDoiTuong = 2.5;
    else if (doiTuong === "2") diemDoiTuong = 1.5;
    else if (doiTuong === "3") diemDoiTuong = 1;
    else if (doiTuong === "") diemDoiTuong = 0;

    const tongDiem = diemMon1 + diemMon2 + diemMon3 + diemKhuVuc + diemDoiTuong;

    if (tongDiem >= diemChuan) {
      tagKqTinhDiem.innerHTML = `🎉 Chúc mừng! Bạn đã ĐẬU với tổng điểm <strong>${tongDiem}</strong>.`;
      tagKqTinhDiem.classList.replace("alert-danger", "alert-info");
    } else {
      tagKqTinhDiem.innerHTML = `❌ Rất tiếc! Bạn đã RỚT với tổng điểm <strong>${tongDiem}</strong>.`;
      tagKqTinhDiem.classList.replace("alert-info", "alert-danger");
    }

    tagKqTinhDiem.style.display = "block";
  };
});
