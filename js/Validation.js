class Validation {
    // Hiển thị thông báo lỗi
    hienThiLoi(idThongBao, noiDung) {
        const thongBao = document.getElementById(idThongBao);

        thongBao.innerHTML = noiDung;
        thongBao.style.display = "block";
    }

    // Xóa thông báo lỗi
    xoaLoi(idThongBao) {
        const thongBao = document.getElementById(idThongBao);

        thongBao.innerHTML = "";
        thongBao.style.display = "none";
    }

    // Kiểm tra tài khoản
    kiemTraTaiKhoan(taiKhoan, danhSachNhanVien, taiKhoanDangCapNhat = null) {
        const regexTaiKhoan = /^\d{4,6}$/;

        if (taiKhoan === "") {
            this.hienThiLoi("tbTKNV", "Tài khoản không được để trống");
            return false;
        }

        if (!regexTaiKhoan.test(taiKhoan)) {
            this.hienThiLoi(
                "tbTKNV",
                "Tài khoản phải gồm từ 4 đến 6 chữ số"
            );
            return false;
        }

        const daTonTai = danhSachNhanVien.some(function (nhanVien) {
            return nhanVien.taiKhoan === taiKhoan;
        });

        if (daTonTai) {
            this.hienThiLoi("tbTKNV", "Tài khoản đã tồn tại");
            return false;
        }

        this.xoaLoi("tbTKNV");
        return true;
    }

    // Kiểm tra họ tên
    kiemTraHoTen(hoTen) {
        const regexHoTen = /^[\p{L}\s]+$/u;

        if (hoTen === "") {
            this.hienThiLoi("tbTen", "Họ tên không được để trống");
            return false;
        }

        if (!regexHoTen.test(hoTen)) {
            this.hienThiLoi("tbTen", "Họ tên chỉ được chứa chữ");
            return false;
        }

        this.xoaLoi("tbTen");
        return true;
    }

    // Kiểm tra email
    kiemTraEmail(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            this.hienThiLoi("tbEmail", "Email không được để trống");
            return false;
        }

        if (!regexEmail.test(email)) {
            this.hienThiLoi("tbEmail", "Email không đúng định dạng");
            return false;
        }

        this.xoaLoi("tbEmail");
        return true;
    }

    // Kiểm tra mật khẩu
    kiemTraMatKhau(matKhau) {
        const regexMatKhau =
            /^(?=\S{6,10}$)(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9\s]).*$/;

        if (matKhau === "") {
            this.hienThiLoi("tbMatKhau", "Mật khẩu không được để trống");
            return false;
        }

        if (!regexMatKhau.test(matKhau)) {
            this.hienThiLoi(
                "tbMatKhau",
                "Mật khẩu 6-10 ký tự, có chữ hoa, số và ký tự đặc biệt"
            );
            return false;
        }

        this.xoaLoi("tbMatKhau");
        return true;
    }

    // Kiểm tra ngày làm theo định dạng mm/dd/yyyy
    kiemTraNgayLam(ngayLam) {
        const regexNgayLam =
            /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;

        if (ngayLam === "") {
            this.hienThiLoi("tbNgay", "Ngày làm không được để trống");
            return false;
        }

        if (!regexNgayLam.test(ngayLam)) {
            this.hienThiLoi(
                "tbNgay",
                "Ngày làm phải đúng định dạng mm/dd/yyyy"
            );
            return false;
        }

        // Kiểm tra ngày có thực sự tồn tại hay không
        const [thang, ngay, nam] = ngayLam.split("/").map(Number);
        const ngayKiemTra = new Date(nam, thang - 1, ngay);

        const ngayHopLe =
            ngayKiemTra.getFullYear() === nam &&
            ngayKiemTra.getMonth() === thang - 1 &&
            ngayKiemTra.getDate() === ngay;

        if (!ngayHopLe) {
            this.hienThiLoi("tbNgay", "Ngày làm không hợp lệ");
            return false;
        }

        this.xoaLoi("tbNgay");
        return true;
    }

    // Kiểm tra lương cơ bản
    kiemTraLuongCoBan(luongCoBan) {
        const luong = Number(luongCoBan);

        if (
            !Number.isFinite(luong) ||
            luong < 1000000 ||
            luong > 20000000
        ) {
            this.hienThiLoi(
                "tbLuongCB",
                "Lương cơ bản phải từ 1.000.000 đến 20.000.000"
            );
            return false;
        }

        this.xoaLoi("tbLuongCB");
        return true;
    }

    // Kiểm tra chức vụ
    kiemTraChucVu(chucVu) {
        const danhSachChucVu = [
            "Giám đốc",
            "Trưởng phòng",
            "Nhân viên"
        ];

        if (!danhSachChucVu.includes(chucVu)) {
            this.hienThiLoi("tbChucVu", "Vui lòng chọn chức vụ hợp lệ");
            return false;
        }

        this.xoaLoi("tbChucVu");
        return true;
    }

    // Kiểm tra giờ làm
    kiemTraGioLam(gioLam) {
        const soGio = Number(gioLam);

        if (
            !Number.isFinite(soGio) ||
            soGio < 80 ||
            soGio > 200
        ) {
            this.hienThiLoi(
                "tbGiolam",
                "Giờ làm phải từ 80 đến 200 giờ"
            );
            return false;
        }

        this.xoaLoi("tbGiolam");
        return true;
    }
}