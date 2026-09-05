// Mảng dùng để lưu danh sách nhân viên
let danhSachNhanVien = [];

// Lưu tài khoản của nhân viên đang được chỉnh sửa
let taiKhoanDangCapNhat = null;

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
function kiemTraDuLieu(nhanVien, dangCapNhat = false) {
  const ketQuaKiemTra = [
    // Khi cập nhật thì không kiểm tra trùng tài khoản
    dangCapNhat
      ? true
      : validation.kiemTraTaiKhoan(nhanVien.taiKhoan, danhSachNhanVien),

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
                        onclick="suaNhanVien('${nhanVien.taiKhoan}')"
                    >
                        Sửa
                    </button>

                    <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        onclick="xoaNhanVien('${nhanVien.taiKhoan}')"
                    >
                        Xóa
                    </button>
                </td>
            </tr>
        `;
  }

  document.getElementById("tableDanhSach").innerHTML = noiDungHTML;
}

// Sửa nhân viên theo tài khoản
function suaNhanVien(taiKhoanCanSua) {
  const nhanVienCanSua = danhSachNhanVien.find(function (nhanVien) {
    return nhanVien.taiKhoan === taiKhoanCanSua;
  });

  if (!nhanVienCanSua) {
    alert("Không tìm thấy nhân viên cần sửa");
    return;
  }

  // Lưu tài khoản của nhân viên đang được chỉnh sửa
  taiKhoanDangCapNhat = taiKhoanCanSua;

  // Đưa dữ liệu của nhân viên cần sửa vào form
  document.getElementById("tknv").value = nhanVienCanSua.taiKhoan;
  document.getElementById("name").value = nhanVienCanSua.hoTen;
  document.getElementById("email").value = nhanVienCanSua.email;
  document.getElementById("password").value = nhanVienCanSua.matKhau;
  document.getElementById("datepicker").value = nhanVienCanSua.ngayLam;
  document.getElementById("luongCB").value = nhanVienCanSua.luongCoBan;
  document.getElementById("chucvu").value = nhanVienCanSua.chucVu;
  document.getElementById("gioLam").value = nhanVienCanSua.gioLam;

  // Không cho thay đổi tài khoản vì là khoá để tìm nv
  document.getElementById("tknv").disabled = true;

  // Chuyển giao diện sang chế độ cập nhật
  document.getElementById("header-title").innerText = "Cập nhật nhân viên";
  document.getElementById("btnThemNV").style.display = "none";
  document.getElementById("btnCapNhat").style.display = "inline-block";

  // Mở modal
  $("#myModal").modal("show");
}

// Xử lý khi nhấn nút "Cập nhật"
document.getElementById("btnCapNhat").onclick = function () {
  // Kiểm tra xem người dùng đã chọn nhân viên cần sửa chưa
  if (taiKhoanDangCapNhat === null) {
    alert("Vui lòng chọn nhân viên cần cập nhật");
    return;
  }

  // Bước 1: Lấy thông tin mới từ form
  const nhanVienCapNhat = layThongTinTuForm();

  // Bước 2: Kiểm tra dữ liệu
  const formHopLe = kiemTraDuLieu(nhanVienCapNhat, true);

  if (!formHopLe) {
    return;
  }

  // Bước 3: Tìm vị trí nhân viên trong mảng
  const viTri = danhSachNhanVien.findIndex(function (nhanVien) {
    return nhanVien.taiKhoan === taiKhoanDangCapNhat;
  });

  if (viTri === -1) {
    alert("Không tìm thấy nhân viên cần cập nhật");
    return;
  }

  // Bước 4: Tính lại tổng lương và xếp loại
  nhanVienCapNhat.tinhTongLuong();
  nhanVienCapNhat.xepLoaiNhanVien();

  // Bước 5: Thay nhân viên cũ bằng nhân viên mới
  danhSachNhanVien[viTri] = nhanVienCapNhat;

  // Bước 6: Hiển thị lại bảng
  hienThiDanhSachNhanVien(danhSachNhanVien);

  // Bước 7: Đóng modal
  $("#myModal").modal("hide");

  // Bước 8: Đưa form về chế độ thêm mới
  chuyenSangCheDoThem();
};

// Xóa nhân viên theo tài khoản
function xoaNhanVien(taiKhoanCanXoa) {
  const viTri = danhSachNhanVien.findIndex(function (nhanVien) {
    return nhanVien.taiKhoan === taiKhoanCanXoa;
  });

  // Không tìm thấy nhân viên
  if (viTri === -1) {
    alert("Không tìm thấy nhân viên cần xóa");
    return;
  }

  const xacNhanXoa = confirm(
    `Bạn có chắc muốn xóa nhân viên ${taiKhoanCanXoa} không?`,
  );

  if (!xacNhanXoa) {
    return;
  }

  // Xóa một phần tử tại vị trí vừa tìm được
  danhSachNhanVien.splice(viTri, 1);

  // Hiển thị lại bảng
  hienThiDanhSachNhanVien(danhSachNhanVien);
}

// Xóa dữ liệu đang có trong form
function resetForm() {
  document.querySelector("#myModal form").reset();

  const danhSachThongBao = document.querySelectorAll(".sp-thongbao");

  danhSachThongBao.forEach(function (thongBao) {
    thongBao.innerHTML = "";
  });
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
  chuyenSangCheDoThem();

  console.log("Danh sách nhân viên:", danhSachNhanVien);
};

// Chuẩn hoá từ khoá
function chuanHoaChuoi(chuoi) {
  return chuoi
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .trim();
}

// Tìm kiếm nhân viên theo xếp loại
function timNhanVienTheoLoai() {
  const tuKhoa = document.getElementById("searchName").value;
  const tuKhoaChuanHoa = chuanHoaChuoi(tuKhoa);

  if (tuKhoaChuanHoa === "") {
    hienThiDanhSachNhanVien(danhSachNhanVien);
    return;
  }

  const danhSachTimDuoc = danhSachNhanVien.filter(function (nhanVien) {
    const xepLoaiChuanHoa = chuanHoaChuoi(nhanVien.xepLoai);
    return xepLoaiChuanHoa.includes(tuKhoaChuanHoa);
  });

  hienThiDanhSachNhanVien(danhSachTimDuoc);
}

document.getElementById("btnTimNV").onclick = function () {
  timNhanVienTheoLoai();
};

document
  .getElementById("searchName")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      timNhanVienTheoLoai();
    }
  });

// Chuyển chế độ thành thêm
function chuyenSangCheDoThem() {
  taiKhoanDangCapNhat = null;

  resetForm();

  document.getElementById("tknv").disabled = false;
  document.getElementById("header-title").innerText = "Thêm nhân viên";
  document.getElementById("btnThemNV").style.display = "inline-block";
  document.getElementById("btnCapNhat").style.display = "none";
}

// Rút gọn sự kiện nút btnThem
document.getElementById("btnThem").onclick = function () {
  chuyenSangCheDoThem();
};

// Reset khi đóng modal
document.getElementById("btnDong").onclick = function () {
  chuyenSangCheDoThem();
};

// Khởi tạo modal ở chế độ thêm nhân viên
chuyenSangCheDoThem();
