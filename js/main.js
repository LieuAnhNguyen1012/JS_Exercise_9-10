// Mảng dùng để lưu danh sách nhân viên
let danhSachNhanVien = [];

// Khởi tạo đối tượng Validation
const validation = new Validation();

// Lấy toàn bộ thông tin người dùng nhập từ form
function layThongTinTuForm() {
  const taiKhoan = document.getElementById("tknv").value.trim();
  const hoTen = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const matKhau = document.getElementById("password").value.trim();
  const ngayLam = document.getElementById("datepicker").value.trim();
  const luongCoBan = document.getElementById("luongCB").value;
  const chucVu = document.getElementById("chucvu").value;
  const gioLam = document.getElementById("gioLam").value;

  return new NhanVien(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCoBan,
    chucVu,
    gioLam,
  );
}

// Kiểm tra toàn bộ dữ liệu nhân viên
function kiemTraDuLieu(nhanVien) {
  const ketQuaKiemTra = [
    validation.kiemTraTaiKhoan(nhanVien.taiKhoan, danhSachNhanVien),
    validation.kiemTraHoTen(nhanVien.hoTen),
    validation.kiemTraEmail(nhanVien.email),
    validation.kiemTraMatKhau(nhanVien.matKhau),
    validation.kiemTraNgayLam(nhanVien.ngayLam),
    validation.kiemTraLuongCoBan(nhanVien.luongCoBan),
    validation.kiemTraChucVu(nhanVien.chucVu),
    validation.kiemTraGioLam(nhanVien.gioLam),
  ];

  return ketQuaKiemTra.every(function (ketQua) {
    return ketQua === true;
  });
}

// Hiển thị danh sách nhân viên lên bảng
function hienThiDanhSachNhanVien(danhSach) {
  let noiDungHTML = "";

  for (let i = 0; i < danhSach.length; i++) {
    const nhanVien = danhSach[i];

    noiDungHTML += `
            <tr>
                <td>${nhanVien.taiKhoan}</td>
                <td>${nhanVien.hoTen}</td>
                <td>${nhanVien.email}</td>
                <td>${nhanVien.ngayLam}</td>
                <td>${nhanVien.chucVu}</td>
                <td>${nhanVien.tongLuong.toLocaleString("vi-VN")} VNĐ</td>
                <td>${nhanVien.xepLoai}</td>
                <td>
                    <button
                        type="button"
                        class="btn btn-warning btn-sm"
                        disabled
                    >
                        Sửa
                    </button>

                    <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        disabled
                    >
                        Xóa
                    </button>
                </td>
            </tr>
        `;
  }

  document.getElementById("tableDanhSach").innerHTML = noiDungHTML;
}

// Xóa dữ liệu đang có trong form
function resetForm() {
  document.querySelector("#myModal form").reset();
}

// Xử lý khi nhấn nút "Thêm người dùng"
document.getElementById("btnThemNV").onclick = function () {
  // Bước 1: Lấy dữ liệu từ form
  const nhanVien = layThongTinTuForm();
  // Bước 2: Kiểm tra dữ liệu
  const formHopLe = kiemTraDuLieu(nhanVien);

  if (!formHopLe) {
    return;
  }
  // Bước 3: Tính tổng lương và xếp loại
  nhanVien.tinhTongLuong();
  nhanVien.xepLoaiNhanVien();

  // Bước 4: Thêm nhân viên vào mảng
  danhSachNhanVien.push(nhanVien);

  // Bước 5: Hiển thị lại danh sách
  hienThiDanhSachNhanVien(danhSachNhanVien);

  // Bước 6: Đóng modal và xóa dữ liệu form
  $("#myModal").modal("hide");
  resetForm();

  console.log("Danh sách nhân viên:", danhSachNhanVien);
};
